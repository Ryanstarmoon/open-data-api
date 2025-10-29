import { NextRequest, NextResponse } from 'next/server';
import { generateRandomUserAgent } from '@/lib/user-agent-generator';

/**
 * 通用 GET 请求转发 API
 * 
 * 使用方法：
 * 1. 通过 URL 参数传递（推荐简单场景）
 *    GET /api/get?url=https://api.example.com/data&param1=value1&param2=value2
 * 
 * 2. 通过 POST body 传递（推荐复杂场景）
 *    POST /api/get
 *    { 
 *      "url": "https://api.example.com/data",
 *      "params": { "param1": "value1", "param2": "value2" },
 *      "headers": { "Authorization": "Bearer token" }
 *    }
 */

interface GetRequestConfig {
  url: string;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

async function handleGetRequest(config: GetRequestConfig) {
  const { url: targetUrl, params = {}, headers = {}, timeout = 30000 } = config;

  // 验证 URL
  let baseUrl: URL;
  try {
    baseUrl = new URL(targetUrl);
  } catch (error) {
    throw new Error('无效的 URL 格式');
  }

  // 合并查询参数
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      baseUrl.searchParams.append(key, String(params[key]));
    }
  });

  // 构建请求头
  const requestHeaders: HeadersInit = {
    'User-Agent': headers?.['User-Agent'] || headers?.['user-agent'] || generateRandomUserAgent(),
    ...headers,
  };

  // 发起请求
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(baseUrl.toString(), {
      method: 'GET',
      headers: requestHeaders,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 获取响应内容类型
    const contentType = response.headers.get('content-type');
    
    // 处理不同的响应类型，直接返回原始数据
    if (contentType?.includes('application/json')) {
      return await response.json();
    } else if (contentType?.includes('text/')) {
      return await response.text();
    } else {
      // 对于其他类型，尝试解析为 JSON，失败则返回文本
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    }

  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error(`请求超时（超过 ${timeout}ms）`);
    }
    throw error;
  }
}

// GET 请求处理（通过 URL 参数）
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
      return NextResponse.json(
        { 
          error: '缺少 url 参数',
          usage: 'GET /api/get?url=https://api.example.com/data&param1=value1&param2=value2'
        },
        { status: 400 }
      );
    }

    // 提取所有查询参数（除了 url 和特殊参数）
    const params: Record<string, any> = {};
    const specialParams = ['url', 'timeout'];
    
    searchParams.forEach((value, key) => {
      if (!specialParams.includes(key)) {
        params[key] = value;
      }
    });

    // 提取特殊配置
    const timeout = parseInt(searchParams.get('timeout') || '30000');

    // 提取请求头（从原始请求中转发部分头）
    const headers: Record<string, string> = {};
    const forwardHeaders = ['authorization', 'user-agent', 'accept', 'accept-language'];
    
    forwardHeaders.forEach(header => {
      const value = request.headers.get(header);
      if (value) {
        headers[header] = value;
      }
    });

    const data = await handleGetRequest({
      url: targetUrl,
      params,
      headers,
      timeout,
    });

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('GET 请求转发错误:', error);
    return NextResponse.json(
      { 
        error: '请求处理失败',
        message: error.message || '未知错误'
      },
      { status: 500 }
    );
  }
}

// POST 请求处理（通过 body 传递配置，适合复杂场景）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, params, headers, timeout } = body as GetRequestConfig;

    if (!url) {
      return NextResponse.json(
        { 
          error: '缺少 url 参数',
          usage: {
            url: 'https://api.example.com/data',
            params: { param1: 'value1', param2: 'value2' },
            headers: { Authorization: 'Bearer token' },
            timeout: 30000
          }
        },
        { status: 400 }
      );
    }

    const data = await handleGetRequest({
      url,
      params,
      headers,
      timeout,
    });

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('GET 请求转发错误:', error);
    return NextResponse.json(
      { 
        error: '请求处理失败',
        message: error.message || '未知错误'
      },
      { status: 500 }
    );
  }
}


