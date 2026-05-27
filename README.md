# 🍅 番茄钟 MVP | Pomodoro Timer MVP

一个轻量、离线优先的番茄钟 Web 应用。

## 功能

- 25 分钟专注 + 5 分钟短休息 + 15 分钟长休息（每 4 轮触发）
- SVG 圆环进度动画
- 开始 / 暂停 / 继续 / 重置 / 跳过
- 声音提醒 + 浏览器通知
- 亮色 / 暗色主题切换
- 自定义时长设置
- 今日统计 + 历史记录
- 键盘快捷键（Space/R/S/T）
- 数据本地持久化（localStorage）
- PWA 就绪，离线可用

## 技术栈

| 层级 | 选型 |
|------|------|
| 框架 | React 19 + TypeScript + Vite |
| 样式 | Tailwind CSS 4 |
| 状态管理 | Zustand |
| 计时引擎 | Web Worker |
| 图标 | Lucide React |
| 动画 | CSS + Framer Motion |
| 测试 | Vitest + React Testing Library |
| 部署 | Vercel |

## 快速开始

```bash
npm install
npm run dev
```

## 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览生产构建 |
| `npm run test` | 运行单元测试 |
| `npm run lint` | ESLint 检查 |

## 项目结构

```
src/
├── components/
│   ├── atom/          # Button, ProgressRing, TimeDisplay, SessionDot
│   ├── molecule/      # ControlBar, SessionLabel
│   ├── organism/      # TimerCard, SessionCard
│   └── layout/        # Header, BottomNav
├── hooks/             # useKeyboard, useNotification
├── store/             # timerStore, preferenceStore (Zustand)
├── pages/             # TimerPage, StatsPage, SettingsPage
├── types/             # TypeScript 类型定义
├── utils/             # format, storage
└── workers/           # timer.worker.ts (Web Worker)
```

## 键盘快捷键

| 按键 | 行为 |
|------|------|
| Space | 开始 / 暂停 |
| R | 重置计时器 |
| S | 跳过当前阶段 |
| T | 切换主题 |
| 1/2/3 | 导航到 计时/统计/设置 |

## 许可证

MIT License

---
*作者: 121212165*
