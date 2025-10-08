// Cyber attack markers data
export const cyberAttackMarkers = [
  {
    markerOffset: -15,
    country: "Bangladesh", // TARGET COUNTRY
    coordinates: [90.3563, 23.685], // Bangladesh coordinates
    attackType: "Target",
    severity: "Target", // Special severity for green color
    attacks: "Protected",
  },
  {
    markerOffset: -15,
    country: "United States",
    coordinates: [-95.7129, 37.0902],
    attackType: "DDoS",
    severity: "High",
    attacks: "1,247",
  },
  {
    markerOffset: -15,
    country: "China",
    coordinates: [104.1954, 35.8617],
    attackType: "Malware",
    severity: "Critical",
    attacks: "2,891",
  },
  // {
  //   markerOffset: -15,
  //   country: "Russia",
  //   coordinates: [105.3188, 61.524],
  //   attackType: "Phishing",
  //   severity: "Medium",
  //   attacks: "756",
  // },
  {
    markerOffset: -15,
    country: "Germany",
    coordinates: [10.4515, 51.1657],
    attackType: "Ransomware",
    severity: "High",
    attacks: "432",
  },
  {
    markerOffset: 25,
    country: "Brazil",
    coordinates: [-51.9253, -14.235],
    attackType: "Botnet",
    severity: "Medium",
    attacks: "389",
  },
  {
    markerOffset: -15,
    country: "United Kingdom",
    coordinates: [-3.436, 55.3781],
    attackType: "Data Breach",
    severity: "Critical",
    attacks: "623",
  },
  {
    markerOffset: -15,
    country: "India",
    coordinates: [78.9629, 20.5937],
    attackType: "SQL Injection",
    severity: "High",
    attacks: "1,124",
  },
  {
    markerOffset: 25,
    country: "Australia",
    coordinates: [133.7751, -25.2744],
    attackType: "APT",
    severity: "Critical",
    attacks: "234",
  },
  {
    markerOffset: -15,
    country: "Japan",
    coordinates: [138.2529, 36.2048],
    attackType: "Zero-day",
    severity: "Critical",
    attacks: "567",
  },
  {
    markerOffset: -15,
    country: "France",
    coordinates: [2.2137, 46.6034],
    attackType: "Cryptojacking",
    severity: "Medium",
    attacks: "445",
  },
];

// Cyber button style
export const professionalButtonStyle = {
  background: "rgba(0, 212, 255, 0.1)",
  border: "1px solid rgba(0, 212, 255, 0.3)",
  borderRadius: "8px",
  color: "#00d4ff",
  padding: "8px 12px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "all 0.3s ease",
  minWidth: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px rgba(0, 212, 255, 0.2)",
  fontFamily: "monospace",
  "&:hover": {
    background: "rgba(0, 212, 255, 0.2)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 212, 255, 0.4)",
    borderColor: "rgba(0, 212, 255, 0.6)",
  },
};

// Glass button style
export const glassButtonStyle = {
  background: "rgba(0, 0, 0, 0.05)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  color: "#333",
  padding: "10px 12px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "all 0.2s ease",
  backdropFilter: "blur(10px)",
  minWidth: "44px",
  height: "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// IP Analytics Data
export const ipAnalyticsData = {
  // New format: source IP -> destination IP -> source country connections
  ipConnections: [
    { sourceIP: "192.168.1.100", destIP: "203.0.113.1", sourceCountry: "United States", attacks: 1247, severity: "High" },
    { sourceIP: "10.0.0.45", destIP: "203.0.113.1", sourceCountry: "China", attacks: 1089, severity: "Critical" },
    // { sourceIP: "172.16.0.23", destIP: "198.51.100.45", sourceCountry: "Russia", attacks: 892, severity: "High" },
    { sourceIP: "192.168.2.156", destIP: "203.0.113.78", sourceCountry: "Germany", attacks: 756, severity: "Medium" },
    { sourceIP: "10.1.1.78", destIP: "198.51.100.123", sourceCountry: "United Kingdom", attacks: 623, severity: "Critical" },
    { sourceIP: "172.20.0.12", destIP: "198.51.100.67", sourceCountry: "India", attacks: 589, severity: "High" },
    { sourceIP: "192.168.3.89", destIP: "198.51.100.156", sourceCountry: "Brazil", attacks: 445, severity: "Medium" },
    { sourceIP: "10.2.2.34", destIP: "203.0.113.234", sourceCountry: "Japan", attacks: 398, severity: "High" },
    { sourceIP: "172.18.0.67", destIP: "203.0.113.89", sourceCountry: "Australia", attacks: 356, severity: "Medium" },
    { sourceIP: "192.168.4.123", destIP: "203.0.113.45", sourceCountry: "France", attacks: 312, severity: "Low" },
    { sourceIP: "192.168.5.67", destIP: "198.51.100.89", sourceCountry: "Canada", attacks: 298, severity: "Low" },
    { sourceIP: "10.3.3.89", destIP: "203.0.113.1", sourceCountry: "South Korea", attacks: 267, severity: "Medium" },
    { sourceIP: "172.22.0.34", destIP: "203.0.113.78", sourceCountry: "Netherlands", attacks: 234, severity: "Low" },
    { sourceIP: "192.168.6.45", destIP: "198.51.100.45", sourceCountry: "Italy", attacks: 198, severity: "Medium" },
    { sourceIP: "10.4.4.12", destIP: "203.0.113.234", sourceCountry: "Spain", attacks: 156, severity: "Low" }
  ],
  // Keep original data for backward compatibility if needed
  topSourceIPs: [
    { ip: "192.168.1.100", country: "United States", attacks: 1247, severity: "High" },
    { ip: "10.0.0.45", country: "China", attacks: 1089, severity: "Critical" },
    // { ip: "172.16.0.23", country: "Russia", attacks: 892, severity: "High" },
    { ip: "192.168.2.156", country: "Germany", attacks: 756, severity: "Medium" },
    { ip: "10.1.1.78", country: "United Kingdom", attacks: 623, severity: "Critical" },
    { ip: "172.20.0.12", country: "India", attacks: 589, severity: "High" },
    { ip: "192.168.3.89", country: "Brazil", attacks: 445, severity: "Medium" },
    { ip: "10.2.2.34", country: "Japan", attacks: 398, severity: "High" },
    { ip: "172.18.0.67", country: "Australia", attacks: 356, severity: "Medium" },
    { ip: "192.168.4.123", country: "France", attacks: 312, severity: "Low" }
  ],
  topDestinationIPs: [
    { ip: "203.0.113.1", country: "Bangladesh", attacks: 2156, severity: "Target" },
    { ip: "198.51.100.45", country: "United States", attacks: 1892, severity: "High" },
    { ip: "203.0.113.78", country: "Germany", attacks: 1456, severity: "Critical" },
    { ip: "198.51.100.123", country: "United Kingdom", attacks: 1234, severity: "High" },
    { ip: "203.0.113.234", country: "Japan", attacks: 1089, severity: "Medium" },
    { ip: "198.51.100.67", country: "India", attacks: 967, severity: "High" },
    { ip: "203.0.113.89", country: "Australia", attacks: 834, severity: "Medium" },
    { ip: "198.51.100.156", country: "Brazil", attacks: 723, severity: "Low" },
    { ip: "203.0.113.45", country: "France", attacks: 645, severity: "Medium" },
    { ip: "198.51.100.89", country: "Canada", attacks: 567, severity: "Low" }
  ],
  topSourceCountries: [
    { country: "China", attacks: 2891, severity: "Critical", percentage: 23.4 },
    { country: "United States", attacks: 1247, severity: "High", percentage: 10.1 },
    // { country: "Russia", attacks: 1089, severity: "High", percentage: 8.8 },
    { country: "India", attacks: 892, severity: "High", percentage: 7.2 },
    { country: "Germany", attacks: 756, severity: "Medium", percentage: 6.1 },
    { country: "United Kingdom", attacks: 623, severity: "Critical", percentage: 5.0 },
    { country: "Brazil", attacks: 589, severity: "Medium", percentage: 4.8 },
    { country: "Japan", attacks: 445, severity: "High", percentage: 3.6 },
    { country: "Australia", attacks: 398, severity: "Medium", percentage: 3.2 },
    { country: "France", attacks: 356, severity: "Low", percentage: 2.9 }
  ]
};

// Geo URL for world map
export const geoUrl = "/world.geojson";

// Severity color mapping
export const getSeverityColor = (severity) => {
  switch (severity.toLowerCase()) {
    case "target":
      return "#00FF00";
    case "critical":
      return "#80001aff";
    case "high":
      return "#ff2600ff";
    case "medium":
      return "#ffff00ff";
    case "low":
      return "#FFD700";
    default:
      return "#FF0000";
  }
};
