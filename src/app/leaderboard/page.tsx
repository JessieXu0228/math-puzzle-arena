'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Trophy, Medal, Award, Crown, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

interface LeaderboardEntry {
  answerer_class: string
  answerer_name: string
  correct_count: number
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/leaderboard')
      const data = await response.json()

      if (data.success) {
        setLeaderboard(data.leaderboard)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-8 w-8 text-yellow-500" />
      case 2:
        return <Medal className="h-7 w-7 text-gray-400" />
      case 3:
        return <Medal className="h-7 w-7 text-amber-600" />
      default:
        return <Award className="h-6 w-6 text-blue-500" />
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">第 1 名</Badge>
    } else if (rank === 2) {
      return <Badge className="bg-gray-400 hover:bg-gray-500">第 2 名</Badge>
    } else if (rank === 3) {
      return <Badge className="bg-amber-600 hover:bg-amber-700">第 3 名</Badge>
    } else {
      return <Badge variant="outline">第 {rank} 名</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回首页
          </Button>
        </Link>

        {/* 页面标题 */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <Trophy className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl">侦探排行榜</CardTitle>
                    <CardDescription className="text-base">
                      答对题目最多的前10名小侦探
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchLeaderboard}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* 排行榜内容 */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border-b border-border">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-24 ml-auto" />
                    </div>
                  ))}
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="py-12 text-center">
                  <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-xl text-muted-foreground mb-4">
                    排行榜空空如也
                  </p>
                  <p className="text-muted-foreground mb-6">
                    快去答题，成为第一个上榜的小侦探吧！
                  </p>
                  <Link href="/solve">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      开始答题
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={`${entry.answerer_class}-${entry.answerer_name}`}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                        index === 0
                          ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 border-2 border-yellow-300 dark:border-yellow-700'
                          : index === 1
                          ? 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800/30 dark:to-gray-700/30 border-2 border-gray-300 dark:border-gray-600'
                          : index === 2
                          ? 'bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 border-2 border-amber-300 dark:border-amber-700'
                          : index < 10
                          ? 'bg-muted/30 border border-border hover:bg-muted/50'
                          : 'bg-muted/20 border border-muted'
                      }`}
                    >
                      {/* 排名图标 */}
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12">
                        {getRankIcon(index + 1)}
                      </div>

                      {/* 姓名和班级 */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{entry.answerer_name}</h3>
                          {getRankBadge(index + 1)}
                        </div>
                        <p className="text-sm text-muted-foreground">{entry.answerer_class}</p>
                      </div>

                      {/* 答对数量 */}
                      <div className="flex-shrink-0 text-right">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {entry.correct_count}
                        </div>
                        <div className="text-xs text-muted-foreground">题答对</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 统计信息 */}
        {!loading && leaderboard.length > 0 && (
          <div className="max-w-4xl mx-auto mt-6">
            <Card className="border border-purple-200 dark:border-purple-800">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {leaderboard.length}
                    </div>
                    <div className="text-sm text-muted-foreground">上榜人数</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {leaderboard.reduce((sum, entry) => sum + entry.correct_count, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">总答对题数</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {leaderboard[0]?.correct_count || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">最高分</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {leaderboard.reduce((sum, entry, index) => {
                        if (index < 10) {
                          return sum + entry.correct_count
                        }
                        return sum
                      }, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">TOP10 总分</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
