import { NextRequest, NextResponse } from 'next/server';
import { 
  generateRandomUserAgent, 
  generateUserAgent, 
  getAvailableTypes,
  generateMultipleUserAgents 
} from '@/lib/user-agent-generator';

/**
 * User-Agent 生成 API
 * 
 * GET /api/user-agent - 生成一个随机 User-Agent
 * GET /api/user-agent?type=iPhone-Wechat - 生成指定类型的 User-Agent
 * GET /api/user-agent?count=10 - 生成多个随机 User-Agent
 * GET /api/user-agent?types=true - 获取所有可用的类型
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // 获取所有可用类型
    if (searchParams.get('types') === 'true') {
      return NextResponse.json({
        types: getAvailableTypes(),
        description: '所有可用的 User-Agent 类型'
      });
    }
    
    // 生成多个 User-Agent
    const countParam = searchParams.get('count');
    if (countParam) {
      const count = parseInt(countParam);
      if (isNaN(count) || count < 1 || count > 100) {
        return NextResponse.json(
          { error: 'count 参数必须是 1-100 之间的数字' },
          { status: 400 }
        );
      }
      
      return NextResponse.json({
        count,
        userAgents: generateMultipleUserAgents(count)
      });
    }
    
    // 生成指定类型的 User-Agent
    const type = searchParams.get('type');
    const userAgent = type ? generateUserAgent(type) : generateRandomUserAgent();
    
    return NextResponse.json({
      userAgent,
      type: type || 'random'
    });
    
  } catch (error: any) {
    console.error('User-Agent 生成错误:', error);
    return NextResponse.json(
      { 
        error: '生成失败',
        message: error.message || '未知错误'
      },
      { status: 500 }
    );
  }
}

