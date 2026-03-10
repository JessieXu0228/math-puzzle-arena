'use client'

import Link from 'next/link'
import { BookOpen, Brain, Trophy, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            数学谜题打擂台
          </h1>
          <p className="text-2xl text-muted-foreground mb-2">
            来出个题，来破个局
          </p>
          <p className="text-sm text-muted-foreground">
            扫描下方二维码，参与数学谜题挑战！
          </p>
        </div>

        {/* 主内容区 */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* 二维码卡片 */}
          <Card className="lg:col-span-1 border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-6 w-6 text-blue-600" />
                扫码参与
              </CardTitle>
              <CardDescription>
                使用手机扫描二维码，随时随地参与挑战
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img
                    src="/qrcode.png"
                    alt="二维码"
                    className="w-48 h-48"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' font-size='12' fill='%23666'%3E二维码生成中%3C/text%3E%3C/svg%3E"
                    }}
                  />
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                扫描二维码打开页面
              </p>
            </CardContent>
          </Card>

          {/* 功能入口卡片 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 出题入口 */}
            <Link href="/create">
              <Card className="border-2 border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                      <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    我要出题
                  </CardTitle>
                  <CardDescription className="text-base">
                    创造一道有趣的数学谜题，挑战其他小朋友
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 rounded-full text-green-700 dark:text-green-300">
                      填写班级和姓名
                    </span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 rounded-full text-green-700 dark:text-green-300">
                      输入题目和答案
                    </span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 rounded-full text-green-700 dark:text-green-300">
                      发布挑战
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 答题入口 */}
            <Link href="/solve">
              <Card className="border-2 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    我要答题
                  </CardTitle>
                  <CardDescription className="text-base">
                    回答其他小朋友出的数学谜题，挑战智力
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-700 dark:text-blue-300">
                      选择题目
                    </span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-700 dark:text-blue-300">
                      提交答案
                    </span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-700 dark:text-blue-300">
                      查看正解
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 排行榜入口 */}
            <Link href="/leaderboard">
              <Card className="border-2 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <Trophy className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    侦探排行榜
                  </CardTitle>
                  <CardDescription className="text-base">
                    查看答对题目最多的前10名小侦探
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-700 dark:text-purple-300">
                      TOP 10
                    </span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-700 dark:text-purple-300">
                      实时排名
                    </span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-700 dark:text-purple-300">
                      积分统计
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* 页脚 */}
        <div className="text-center mt-12 text-muted-foreground text-sm">
          <p>© 2024 数学谜题打擂台 - 快乐学习，智慧成长</p>
        </div>
      </div>
    </div>
  )
}
