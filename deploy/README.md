# 服务器部署

域名：https://wh.likaikai.com

采用与 ProxyLens 相同的预构建镜像 + 独立 Docker Compose 目录 + 外部 Caddy 网络。
服务器目录：`/root/github/lkk-one/cloudwuhan`。
外部代理配置：`/root/github/lkk-one/caddy/Caddyfile`。

本地执行 `npm ci && npm run build`，将 `dist/`、`Dockerfile`、`deploy/compose.yaml` 上传到服务器独立目录（compose.yaml 放在目录根部）。

```bash
docker build --pull=false -t cloudwuhan:1.0.0 .
docker compose up -d
docker compose ps
curl -f http://127.0.0.1:18791/
```

将 `Caddyfile.snippet` 的域名配置追加到现有 Caddyfile，先备份原文件，验证后热加载：

```bash
docker exec home-caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
docker exec home-caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
```

Caddy 自动申请和续期证书。域名 A 记录指向 121.4.45.129。服务只对本机开放 18791，Caddy 通过 Docker 网络访问 cloudwuhan:8080。

## 本次上线结果

2026-10-13：已部署至指定目录；容器 `cloudwuhan-cloudwuhan-1` 健康检查通过。HTTPS 返回 200，证书校验通过，HTTP 返回 308 跳转到 HTTPS。

外部 Caddyfile 备份：`/root/github/lkk-one/caddy/Caddyfile.before-cloudwuhan-20261013143542`。

镜像移除了 Caddy 的低端口文件能力，因为本站在容器内监听 8080，可保留 `cap_drop: ALL` 与只读文件系统限制。
