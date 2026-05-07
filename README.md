# iping_search

[English](#english) | [中文](#中文)

---

## English

A free MCP (Model Context Protocol) server powered by `api.iping.cc` for IP intelligence lookup.

- API: `https://api.iping.cc/v1/query?ip=<IP>&language=zh|en`
- Transport: `stdio`
- Tool name: `iping_search`
- GitHub repo: `https://github.com/Voccoo/iping_search.git`
- Public free query site: `https://www.iping.cc`

### What this MCP provides

- **Free to use** (no total-call quota at this time)
- **Frequency-limited** (requests are subject to upstream rate/frequency controls)
- **Current scope: IPv4 query only** (upstream API currently supports IPv4 queries)
- Rich result dimensions beyond basic geo:
  - Geo location: country/province/city/district, lat/lon, timezone, postal code
  - Network & ASN: ASN, owner/type/domain/country, ISP details
  - Risk & proxy signals: risk score/tags, proxy/VPN/Tor/dataset indicators
  - CIDR/network context and related historical/network-side dimensions returned by upstream fields

### MCP Tool

#### `iping_search`

**Input**

- `ip` (string, required): IPv4 address
- `language` (`zh` | `en`, optional, default `zh`)

**Output**

- Success: `ok: true` + `data` (upstream API response body)
- Failure: `ok: false` + error message, with `isError: true`

### Example success response

```json
{
  "ok": true,
  "data": {
    "ip": "8.8.8.8",
    "country": "United States",
    "country_code": "US",
    "province": "California",
    "city": "Mountain View",
    "latitude": 37.4056,
    "longitude": -122.0775,
    "timezone": "America/Los_Angeles",
    "postal_code": "94043",
    "asn": "15169",
    "as_owner": "Google LLC",
    "as_type": "Content",
    "as_domain": "google.com",
    "as_country": "US",
    "risk_score": 8,
    "risk_tag": ["public_dns"],
    "is_proxy": false,
    "is_vpn": false,
    "is_tor": false,
    "cidr": "8.8.8.0/24"
  }
}
```

### Install & build (developer)

```bash
npm install
npm run build
```

Dev mode (run without build):

```bash
npm run dev
```

### Use with MCP clients (recommended: Git URL)

> Goal: users can run directly from GitHub without cloning to a fixed local path first.

Recommended shared config:

- `command`: `npx`
- `args`: `[
  "-y",
  "github:Voccoo/iping_search",
  "iping_search"
]`

Notes:

- `github:Voccoo/iping_search` pulls from GitHub
- package `prepare` builds `dist` automatically
- `iping_search` is the exposed executable entry (bin)

#### Claude Desktop

Common config path:

- Windows: `%APPDATA%\\Claude\\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "iping_search": {
      "command": "npx",
      "args": ["-y", "github:Voccoo/iping_search", "iping_search"]
    }
  }
}
```

#### Cursor

Project config path: `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "iping_search": {
      "command": "npx",
      "args": ["-y", "github:Voccoo/iping_search", "iping_search"]
    }
  }
}
```

#### Windsurf

Common config path:

- `~/.codeium/windsurf/mcp_config.json`

```json
{
  "mcpServers": {
    "iping_search": {
      "command": "npx",
      "args": ["-y", "github:Voccoo/iping_search", "iping_search"]
    }
  }
}
```

#### Cline / other MCP-compatible clients

Most clients use the same `mcpServers` schema:

```json
{
  "mcpServers": {
    "iping_search": {
      "command": "npx",
      "args": ["-y", "github:Voccoo/iping_search", "iping_search"]
    }
  }
}
```

### Usage example (inside MCP-compatible clients)

- Chinese: `iping_search({"ip":"8.8.8.8","language":"zh"})`
- English: `iping_search({"ip":"8.8.8.8","language":"en"})`

### Runtime notes

1. First run may take longer because it pulls and builds from GitHub.
2. Node.js 18+ is recommended.
3. If startup fails, check:
   - `npx` availability
   - network access to GitHub
   - JSON syntax errors in config

---

## 中文

一个免费可用的 MCP（Model Context Protocol）服务：通过 `api.iping.cc` 提供 IP 智能查询，工具名为 `iping_search`。

- API：`https://api.iping.cc/v1/query?ip=<IP>&language=zh|en`
- 传输方式：`stdio`
- 工具名：`iping_search`
- GitHub 仓库：`https://github.com/Voccoo/iping_search.git`
- 公开免费查询站点：`https://www.iping.cc`

### 这个 MCP 提供什么

- **免费可用**（目前没有总调用次数配额）
- **有请求频率限制**（受上游 API 的速率/频率策略约束）
- **当前仅支持 IPv4 查询**（上游接口当前为 IPv4 查询）
- 返回维度不止基础地理信息，还包括：
  - 地理维度：国家/省/市/区县、经纬度、时区、邮编
  - 网络与 ASN：ASN、所属机构、类型、域名、国家、运营商信息
  - 风险与代理特征：风险分、风险标签、代理/VPN/Tor/数据中心等信号
  - CIDR/网段上下文及上游返回的相关历史/网络侧字段

### MCP 工具说明

#### `iping_search`

**输入参数**

- `ip` (string, 必填)：IPv4 地址
- `language` (`zh` | `en`, 可选，默认 `zh`)

**返回**

- 成功时：`ok: true` + `data`（上游 API 返回体）
- 失败时：`ok: false` + 错误信息，且 `isError: true`

### 成功返回示例

```json
{
  "ok": true,
  "data": {
    "ip": "8.8.8.8",
    "country": "United States",
    "country_code": "US",
    "province": "California",
    "city": "Mountain View",
    "latitude": 37.4056,
    "longitude": -122.0775,
    "timezone": "America/Los_Angeles",
    "postal_code": "94043",
    "asn": "15169",
    "as_owner": "Google LLC",
    "as_type": "Content",
    "as_domain": "google.com",
    "as_country": "US",
    "risk_score": 8,
    "risk_tag": ["public_dns"],
    "is_proxy": false,
    "is_vpn": false,
    "is_tor": false,
    "cidr": "8.8.8.0/24"
  }
}
```

### 1. 安装与构建（开发者）

```bash
npm install
npm run build
```

开发调试（不编译直接运行）：

```bash
npm run dev
```

### 2. 给各大 CLI 使用（推荐：直接用 Git 地址）

> 目标：使用者无需预先 clone 到本地固定路径，直接填 Git 地址即可运行。

统一推荐配置：

- `command`: `npx`
- `args`: `[
  "-y",
  "github:Voccoo/iping_search",
  "iping_search"
]`

说明：

- `github:Voccoo/iping_search` 会从 GitHub 拉取项目
- 包内 `prepare` 会自动构建 `dist`
- `iping_search` 是本项目暴露的可执行入口（bin）

#### 2.1 Claude Desktop

配置文件常见位置：

- Windows：`%APPDATA%\\Claude\\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "iping_search": {
      "command": "npx",
      "args": ["-y", "github:Voccoo/iping_search", "iping_search"]
    }
  }
}
```

#### 2.2 Cursor

项目内配置可用：`.cursor/mcp.json`

```json
{
  "mcpServers": {
    "iping_search": {
      "command": "npx",
      "args": ["-y", "github:Voccoo/iping_search", "iping_search"]
    }
  }
}
```

#### 2.3 Windsurf

配置文件常见位置：

- `~/.codeium/windsurf/mcp_config.json`

```json
{
  "mcpServers": {
    "iping_search": {
      "command": "npx",
      "args": ["-y", "github:Voccoo/iping_search", "iping_search"]
    }
  }
}
```

#### 2.4 Cline / 其他兼容 MCP 的客户端

多数客户端也使用 `mcpServers` 结构：

```json
{
  "mcpServers": {
    "iping_search": {
      "command": "npx",
      "args": ["-y", "github:Voccoo/iping_search", "iping_search"]
    }
  }
}
```

### 3. 使用示例（在支持 MCP 的客户端里）

- 中文：`iping_search({"ip":"8.8.8.8","language":"zh"})`
- 英文：`iping_search({"ip":"8.8.8.8","language":"en"})`

### 4. 运行建议

1. 首次运行会从 GitHub 拉取并构建，可能稍慢。
2. 需要本机安装 Node.js（建议 18+）。
3. 如果客户端启动失败，先检查：
   - `npx` 是否可用
   - 网络是否可访问 GitHub
   - JSON 配置是否有语法错误
