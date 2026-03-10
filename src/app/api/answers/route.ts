import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/storage/database/supabase-client'

// POST - 提交答案
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { puzzleId, answererClass, answererName, submittedAnswer } = body

    // 验证必填字段
    if (!puzzleId || !answererClass || !answererName || !submittedAnswer) {
      return NextResponse.json(
        { success: false, error: '所有字段都是必填的' },
        { status: 400 }
      )
    }

    const client = getSupabaseClient()

    // 先获取题目信息（包括正确答案）
    const { data: puzzle, error: puzzleError } = await client
      .from('puzzles')
      .select('answer')
      .eq('id', puzzleId)
      .single()

    if (puzzleError || !puzzle) {
      return NextResponse.json(
        { success: false, error: '题目不存在' },
        { status: 404 }
      )
    }

    // 判断答案是否正确（去除空格后比较）
    const isCorrect = submittedAnswer.trim().toLowerCase() === puzzle.answer.trim().toLowerCase()

    // 插入答题记录
    const { data: answer, error: insertError } = await client
      .from('answers')
      .insert({
        puzzle_id: puzzleId,
        answerer_class: answererClass,
        answerer_name: answererName,
        submitted_answer: submittedAnswer.trim(),
        is_correct: isCorrect
      })
      .select()
      .single()

    if (insertError) {
      console.error('Failed to insert answer:', insertError)
      return NextResponse.json(
        { success: false, error: '提交答案失败' },
        { status: 500 }
      )
    }

    // 获取该题目的答题统计
    const { data: stats } = await client
      .from('answers')
      .select('is_correct')
      .eq('puzzle_id', puzzleId)

    const correctCount = stats?.filter(s => s.is_correct).length || 0
    const totalCount = stats?.length || 0

    return NextResponse.json({
      success: true,
      isCorrect,
      message: isCorrect ? '🎉 恭喜你，回答正确！' : '😊 很遗憾，答案不正确，再想想吧！',
      answerCount: {
        puzzle_id: puzzleId,
        correct_count: correctCount,
        total_count: totalCount
      }
    })
  } catch (error) {
    console.error('Error in POST /api/answers:', error)
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    )
  }
}
