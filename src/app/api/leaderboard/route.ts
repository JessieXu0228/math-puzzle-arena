import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/storage/database/supabase-client'

// GET - 获取排行榜
export async function GET(request: NextRequest) {
  try {
    const client = getSupabaseClient()

    // 查询所有正确答题记录，并按答题人分组统计
    const { data, error } = await client
      .from('answers')
      .select('answerer_class, answerer_name, is_correct')
      .eq('is_correct', true)

    if (error) {
      console.error('Failed to fetch leaderboard:', error)
      return NextResponse.json(
        { success: false, error: '获取排行榜失败' },
        { status: 500 }
      )
    }

    // 按答题人分组统计
    const stats = new Map<string, { answerer_class: string; answerer_name: string; correct_count: number }>()

    data?.forEach(answer => {
      const key = `${answer.answerer_class}-${answer.answerer_name}`
      const existing = stats.get(key)
      if (existing) {
        existing.correct_count++
      } else {
        stats.set(key, {
          answerer_class: answer.answerer_class,
          answerer_name: answer.answerer_name,
          correct_count: 1
        })
      }
    })

    // 转换为数组并按答对数量降序排序
    const leaderboard = Array.from(stats.values()).sort((a, b) => b.correct_count - a.correct_count)

    // 只取前10名
    const top10 = leaderboard.slice(0, 10)

    return NextResponse.json({
      success: true,
      leaderboard: top10
    })
  } catch (error) {
    console.error('Error in GET /api/leaderboard:', error)
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    )
  }
}
