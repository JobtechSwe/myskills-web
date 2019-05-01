import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer'
import React from 'react'

interface IPdfLoginProps {
  CV: any
}

const Pdf: React.FC<IPdfLoginProps> = ({ CV }) => (
  <Document>
    <Page style={styles.body}>
      <CV />
      <Text
        fixed
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        style={styles.pageNumber}
      />
    </Page>
  </Document>
)

const PdfLink: React.FC<IPdfLoginProps> = ({ CV }) => (
  <PDFDownloadLink document={<Pdf CV={CV} />} fileName="cv.pdf">
    {({ blob, url, loading, error }) =>
      loading ? 'Laddar...' : 'Spara CV som PDF'
    }
  </PDFDownloadLink>
)

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

export default PdfLink
