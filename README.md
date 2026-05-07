# iping-geo-mcp

一个免费可用的 MCP（Model Context Protocol）服务：通过 `api.iping.cc` 查询 IP 对应的经纬度与地理信息，支持中英文返回。

- API: `https://api.iping.cc/v1/query?ip=<IP>&language=zh|en`
- 传输方式：`stdio`
- 工具名：`query_ip_geo`

## 1. 安装与构建

```bash
npm install
npm run build
```

开发调试（不编译直接运行）：

```bash
npm run dev
```

## 2. MCP Tool 说明

### `query_ip_geo`

**输入参数**

- `ip` (string, 必填): IPv4 或 IPv6
- `language` (`zh` | `en`, 可选, 默认 `zh`)

**返回**

- 成功时：`ok: true` + `data`（上游 API 返回体）
- 失败时：`ok: false` + 错误信息，且 `isError: true`

## 3. 给各大 CLI 使用

> 下列配置都采用 MCP 通用结构：`mcpServers -> { name: { command, args, env? } }`

请把路径替换成你本机的绝对路径。

假设项目目录是：

- Windows: `F:\\LingJiang-ai\\iping_search`

并且已经执行过 `npm install && npm run build`。

推荐启动命令：

- `command`: `node`
- `args`: `["F:/LingJiang-ai/iping_search/dist/index.js"]`

---

### 3.1 Claude Desktop

配置文件常见位置：

- Windows: `%APPDATA%\\Claude\\claude_desktop_config.json`

示例：

```json
{
  "mcpServers": {
    "iping-geo": {
      "command": "node",
      "args": ["F:/LingJiang-ai/iping_search/dist/index.js"]
    }
  }
}
```

---

### 3.2 Cursor

项目内配置可用：`.cursor/mcp.json`

```json
{
  "mcpServers": {
    "iping-geo": {
      "command": "node",
      "args": ["F:/LingJiang-ai/iping_search/dist/index.js"]
    }
  }
}
```

---

### 3.3 Windsurf

配置文件常见位置：

- `~/.codeium/windsurf/mcp_config.json`

```json
{
  "mcpServers": {
    "iping-geo": {
      "command": "node",
      "args": ["F:/LingJiang-ai/iping_search/dist/index.js"]
    }
  }
}
```

---

### 3.4 Cline / 其他兼容 MCP 的客户端

多数客户端也使用 `mcpServers` 结构，按同样方式填写：

```json
{
  "mcpServers": {
    "iping-geo": {
      "command": "node",
      "args": ["F:/LingJiang-ai/iping_search/dist/index.js"]
    }
  }
}
```

## 4. 使用示例（在支持 MCP 的客户端里）

你可以让客户端调用：

- 中文：`query_ip_geo({"ip":"8.8.8.8","language":"zh"})`
- 英文：`query_ip_geo({"ip":"8.8.8.8","language":"en"})`

## 5. 运行建议

1. 先 `npm run build`，优先用 `dist/index.js` 提供稳定服务。
2. 如需调试，可把 `command` 改成 `npx`，`args` 改为 `["tsx", "src/index.ts"]`。
3. 如果客户端无法启动 MCP，先检查：
   - `node` 是否在 PATH 中
   - `args` 是否为绝对路径
   - JSON 是否有多余逗号
