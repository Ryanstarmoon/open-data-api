import { NextRequest, NextResponse } from 'next/server';
import { generateRandomUserAgent } from '@/lib/user-agent-generator';

/**
 * 通用 POST 请求转发 API
 * 
 * 使用方法：
 * POST /api/post
 * {
 *   "url": "https://api.example.com/endpoint",
 *   "data": { "key": "value" },
 *   "params": { "queryParam": "value" },
 *   "headers": { "Authorization": "Bearer token" },
 *   "contentType": "application/json",
 *   "timeout": 30000
 * }
 */

interface PostRequestConfig {
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  contentType?: string;
  timeout?: number;
}

async function handlePostRequest(config: PostRequestConfig) {
  const { 
    url: targetUrl, 
    data = {}, 
    params = {}, 
    headers = {}, 
    contentType = 'application/json',
    timeout = 30000
  } = config;

  // 验证 URL
  let baseUrl: URL;
  try {
    baseUrl = new URL(targetUrl);
  } catch (error) {
    throw new Error('无效的 URL 格式');
  }

  // 添加查询参数
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      baseUrl.searchParams.append(key, String(params[key]));
    }
  });

  // 构建请求头
  const requestHeaders: HeadersInit = {
    'Content-Type': contentType,
    'User-Agent': headers?.['User-Agent'] || headers?.['user-agent'] || generateRandomUserAgent(),
    ...headers,
  };

  // 构建请求体
  let body: string | FormData | undefined;
  
  if (contentType === 'application/json') {
    body = JSON.stringify(data);
  } else if (contentType === 'application/x-www-form-urlencoded') {
    // URL 编码格式
    const formData = new URLSearchParams();
    Object.keys(data).forEach(key => {
      formData.append(key, String(data[key]));
    });
    body = formData.toString();
  } else if (contentType === 'multipart/form-data') {
    // FormData 格式
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    body = formData;
    // FormData 会自动设置正确的 Content-Type，所以删除我们手动设置的
    delete (requestHeaders as any)['Content-Type'];
  } else {
    // 其他格式直接使用原始数据
    body = typeof data === 'string' ? data : JSON.stringify(data);
  }

  // 发起请求
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(baseUrl.toString(), {
      method: 'POST',
      headers: requestHeaders,
      body,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 获取响应内容类型
    const responseContentType = response.headers.get('content-type');
    
    // 处理不同的响应类型，直接返回原始数据
    if (responseContentType?.includes('application/json')) {
      return await response.json();
    } else if (responseContentType?.includes('text/')) {
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

// POST 请求处理
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, data, params, headers, contentType, timeout } = body as PostRequestConfig;

    if (!url) {
      return NextResponse.json(
        { 
          error: '缺少 url 参数',
          usage: {
            url: 'https://api.example.com/endpoint',
            data: { key: 'value' },
            params: { queryParam: 'value' },
            headers: { Authorization: 'Bearer token' },
            contentType: 'application/json',
            timeout: 30000
          }
        },
        { status: 400 }
      );
    }

    const responseData = await handlePostRequest({
      url,
      data,
      params,
      headers,
      contentType,
      timeout,
    });

    return NextResponse.json(responseData);

  } catch (error: any) {
    console.error('POST 请求转发错误:', error);
    return NextResponse.json(
      { 
        error: '请求处理失败',
        message: error.message || '未知错误'
      },
      { status: 500 }
    );
  }
}

// 允许 OPTIONS 请求（CORS 预检）
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}


