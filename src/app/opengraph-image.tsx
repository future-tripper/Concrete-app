import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'CONCRETE - Vapor Maximization Platform';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#020617',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <span style={{ fontSize: 180 }}>💨</span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-2px',
            }}
          >
            CONCRETE
          </span>
          <span
            style={{
              fontSize: 28,
              color: '#a78bfa',
              fontWeight: 500,
            }}
          >
            Vapor Maximization Platform
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
