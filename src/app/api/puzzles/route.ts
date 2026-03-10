import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/storage/database/supabase-client'

// POST - 创建题目
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { creatorClass, creatorName, question, answer } = body

    // 验证必填字段
    if (!creatorClass || !creatorName || !question || !answer) {
      return NextResponse.json(
        { success: false, error: '所有字段都是必填的' },
        { status: 400 }
      )
    }

    const client = getSupabaseClient()

    const { data, error } = await client
      .from('puzzles')
      .insert({
        creator_class: creatorClass,
        creator_name: creatorName,
        question: question.trim(),
        answer: answer.trim()
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to create puzzle:', error)
      return NextResponse.json(
        { success: false, error: '创建题目失败' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      puzzle: data
    })
  } catch (error) {
    console.error('Error in POST /api/puzzles:', error)
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    )
  }
}

// GET - 获取所有题目
export async function GET(request: NextRequest) {
  try {
    const client = getSupabaseClient()

    const { data, error } = await client
      .from('puzzles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch puzzles:', error)
      return NextResponse.json(
        { success: false, error: '获取题目失败' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      puzzles: data || []
    })
  } catch (error) {
    console.error('Error in GET /api/puzzles:', error)
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    )
  }
}
