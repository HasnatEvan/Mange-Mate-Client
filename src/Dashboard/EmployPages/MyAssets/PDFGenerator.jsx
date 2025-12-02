// 📄 Professional PDFGenerator.jsx
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// ====== PDF STYLES ======
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },

  // Header bar
  headerBar: {
    backgroundColor: "#1E3A8A", // Blue tone
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Section title
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#1E3A8A",
    borderBottom: "1px solid #1E3A8A",
    paddingBottom: 3,
  },

  // Info rows
  row: {
    flexDirection: "row",
    marginBottom: 6,
  },
  label: {
    width: "30%",
    fontWeight: "bold",
    color: "#1F2937",
  },
  value: {
    width: "70%",
    color: "#374151",
  },

  // Signature box
  signatureBox: {
    marginTop: 40,
    borderTop: "1px solid #4B5563",
    width: "40%",
    paddingTop: 5,
    textAlign: "center",
    fontSize: 11,
    color: "#4B5563",
  },

  footer: {
    position: "absolute",
    bottom: 15,
    left: 30,
    right: 30,
    fontSize: 10,
    color: "gray",
    textAlign: "center",
  },
});

// ====== PDF COMPONENT ======
const AssetPDF = ({ request }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>Asset Details Report</Text>
        </View>

        {/* GENERAL INFORMATION */}
        <Text style={styles.sectionTitle}>General Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.value}>{request.companyName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Asset Name:</Text>
          <Text style={styles.value}>{request.assetsName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Asset Type:</Text>
          <Text style={styles.value}>{request.assetsType}</Text>
        </View>

        {/* DATES */}
        <Text style={styles.sectionTitle}>Timeline</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Request Date:</Text>
          <Text style={styles.value}>
            {new Date(request.requestDate).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Approval Date:</Text>
          <Text style={styles.value}>
            {request.approvalDate
              ? new Date(request.approvalDate).toLocaleDateString()
              : "N/A"}
          </Text>
        </View>

        {/* EMPLOYEE */}
        <Text style={styles.sectionTitle}>Employee Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{request.employ?.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{request.employ?.email}</Text>
        </View>

        {/* STATUS */}
        <Text style={styles.sectionTitle}>Request Status</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{request.status}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Note:</Text>
          <Text style={styles.value}>{request.note || "No additional notes."}</Text>
        </View>

        {/* SIGNATURE SECTION */}
        <View style={{ marginTop: 40, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.signatureBox}>
            <Text>Employee Signature</Text>
          </View>

          <View style={styles.signatureBox}>
            <Text>HR / Manager Signature</Text>
          </View>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          Printed on {new Date().toLocaleString()} | Confidential Document
        </Text>
      </Page>
    </Document>
  );
};

export default AssetPDF;
