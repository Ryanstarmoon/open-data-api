export default function Home() {
  return (
    <main style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6',
      textAlign: 'center',
      paddingTop: '6rem'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '600' }}>
        🚀 Hello world
      </h1>
      
      <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '2rem' }}>
        ok
      </p>
      
      <div style={{ 
        padding: '2rem', 
        background: '#f8f9fa', 
        borderRadius: '12px',
        marginTop: '3rem'
      }}>
        <p style={{ fontSize: '1.1rem', color: '#333', margin: 0 }}>
          服务运行正常 ✓
        </p>
      </div>

      <footer style={{ 
        marginTop: '4rem', 
        paddingTop: '2rem', 
        borderTop: '1px solid #eee',
        color: '#999',
        fontSize: '0.9rem'
      }}>
        <p>Powered by Next.js · Deployed on Vercel</p>
      </footer>
    </main>
  );
}
