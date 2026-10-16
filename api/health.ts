
export default function handler(
  req: { method?: string },
  res: {
    setHeader: (name: string, value: string) => void;
    status: (code: number) => {
      json: (body: object) => void;
    };
  }
) {
  res.setHeader('Cache-Control', 'no-store');

  return res.status(200).json({
    status: 'ok',
    service: 'telegram-bot',
    timestamp: new Date().toISOString()
  });
}
