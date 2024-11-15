export default async function handler(req, res) {
    try {
      const response = await fetch('http://localhost:5001/api/plugins');
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching plugins:', error);
      res.status(500).json({ error: 'Failed to fetch plugins' });
    }
  }
  