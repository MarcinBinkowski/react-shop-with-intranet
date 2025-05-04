import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Invoice } from '@/pages/intranet/invoices'
import { formatDate } from '@/lib/utils'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 20,
  },
  total: {
    marginTop: 30,
    fontSize: 16,
  }
})

export const InvoicePDF = ({ invoice }: { invoice: Invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Invoice #{invoice.invoiceNumber}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Customer:</Text>
        <Text style={styles.value}>{invoice.customerName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{invoice.status}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Issue Date:</Text>
        <Text style={styles.value}>{formatDate(invoice.issueDate)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Due Date:</Text>
        <Text style={styles.value}>{formatDate(invoice.dueDate)}</Text>
      </View>

      <View style={styles.divider} />

      {invoice.notes && (
        <View style={styles.row}>
          <Text style={styles.label}>Notes:</Text>
          <Text style={styles.value}>{invoice.notes}</Text>
        </View>
      )}

      <View style={styles.total}>
        <Text>Total Amount: ${invoice.amount.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
)