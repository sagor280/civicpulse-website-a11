import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
});

const PDFcomponent = ({ payment }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Invoice</Text>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Customer Email:</Text>{" "}
            {payment.customerEmail}
          </Text>
          <Text>
            <Text style={styles.label}>Payment Type:</Text>{" "}
            {payment.paymentType}
          </Text>
          <Text>
            <Text style={styles.label}>Transaction ID:</Text>{" "}
            {payment.transactionId}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Amount:</Text> {payment.amount}{" "}
            {payment.currency.toUpperCase()}
          </Text>
          <Text>
            <Text style={styles.label}>Payment Status:</Text>{" "}
            {payment.paymentStatus}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Paid At:</Text>{" "}
            {new Date(payment.paidAt).toLocaleString()}
          </Text>
        </View>

        <Text style={{ marginTop: 30, textAlign: "center" }}>
          Thank you for your payment
        </Text>
      </Page>
    </Document>
  );
};

export default PDFcomponent;
