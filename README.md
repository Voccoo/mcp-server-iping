# iping-geo-mcp

一个免费可用的 MCP（Model Context Protocol）服务：通过 `api.iping.cc` 查询 IP 对应的经纬度与地理信息，支持中英文返回。

- API: `https://api.iping.cc/v1/query?ip=<IP>&language=zh|en`
- 传输方式：`stdio`
- 工具名：`query_ip_geo`
- Git 仓库：`https://github.com/Voccoo/mcp-server-iping.git`

## 1. 安装与构建（开发者）

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

## 3. 给各大 CLI 使用（推荐：直接用 Git 地址）

> 目标：使用者无需预先 clone 到本地固定路径，直接填 Git 地址即可运行。

统一推荐配置：

- `command`: `npx`
- `args`: `[
  "-y",
  "github:Voccoo/mcp-server-iping",
  "iping-geo-mcp"
]`

说明：
- `github:Voccoo/mcp-server-iping` 会从 GitHub 拉取项目
- 包内 `prepare` 会自动构建 `dist`
- `iping-geo-mcp` 是本项目暴露的可执行入口（bin）

---

### 3.1 Claude Desktop

配置文件常见位置：

- Windows: `%APPDATA%\\Claude\\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "iping-geo": {
      "command": "npx",
      "args": ["-y", "github:Voccoo/mcp-server-iping", "iping-geo-mcp"]
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
      "command": "npx",
      "args": ["-y", "github:Voccoo/mcp-server-iping", "iping-geo-mcp"]
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
      "command": "npx",
      "args": ["-y", "github:Voccoo/mcp-server-iping", "iping-geo-mcp"]
    }
  }
}
```

---

### 3.4 Cline / 其他兼容 MCP 的客户端

多数客户端也使用 `mcpServers` 结构：

```json
{
  "mcpServers": {
    "iping-geo": {
      "command": "npx",
      "args": ["-y", "github:Voccoo/mcp-server-iping", "iping-geo-mcp"]
    }
  }
}
```

## 4. 使用示例（在支持 MCP 的客户端里）

- 中文：`query_ip_geo({"ip":"8.8.8.8","language":"zh"})`
- 英文：`query_ip_geo({"ip":"8.8.8.8","language":"en"})`

## 5. 运行建议

1. 首次运行会从 GitHub 拉取并构建，可能稍慢。
2. 需要本机安装 Node.js（建议 18+）。
3. 如果客户端启动失败，先检查：
   - `npx` 是否可用
   - 网络是否可访问 GitHub
   - JSON 配置是否有语法错误
