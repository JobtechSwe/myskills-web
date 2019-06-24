import React from 'react'
import { QRCode } from 'react-qr-svg'

interface QRProps {
  consentId: string
}

const QR: React.FC<QRProps> = ({ consentId }) => {
  return <QRCode style={{ width: 200 }} value={consentId} />
}

export default QR
