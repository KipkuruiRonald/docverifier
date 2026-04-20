# 🔗 DocVerifier – Blockchain-Based Document Verification System

<div align="center">
  <img src="public/docverifier-logo.png" alt="DocVerifier Logo" width="200"/>
  
  **Secure, Tamper-Proof Loan Document Verification Using Blockchain Technology**
  
  [![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)](https://ethereum.org/)
  [![Polygon](https://img.shields.io/badge/Polygon-8247E5?style=for-the-badge&logo=polygon&logoColor=white)](https://polygon.technology/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)](https://soliditylang.org/)
</div>

---

## 👤 Author

**Ronald Kipkurui**  
*BSc. Science in Computer Science  
Kibabii University (KIBU)*

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Smart Contract](#-smart-contract)
- [Getting Started](#-getting-started)
- [Deployment Guide](#-deployment-guide)
- [Usage](#-usage)
- [Demo Execution](#-demo-execution)
- [Security Considerations](#-security-considerations)
- [Commercial Viability](#-commercial-viability)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🎯 Problem Statement

Loan document verification is a critical yet inefficient process in the lending ecosystem:

| Challenge | Impact |
|-----------|--------|
| **Manual Verification** | Slow processing, high operational costs |
| **Siloed Systems** | No inter-bank trust, duplicated efforts |
| **Document Tampering** | Fraud risk, financial losses |
| **Multiple Submissions** | Borrower friction, institutional overhead |
| **No Audit Trail** | Compliance and dispute resolution challenges |

### Current Industry Pain Points

- **Banks & NBFCs** spend billions annually on document verification
- **Average loan processing time**: 7-14 days (could be reduced to hours)
- **Document fraud** accounts for 10-30% of loan defaults in emerging markets
- **Re-verification** of same documents across institutions wastes resources

---

## 💡 Solution Overview

**DocVerifier** is a blockchain-powered document verification platform that ensures the authenticity and integrity of loan documents using cryptographic hashing and smart contracts.

### How It Works

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Document      │     │   SHA-256       │     │   Blockchain    │
│   Upload        │────▶│   Hash          │────▶│   Storage       │
│                 │     │   Generation    │     │   (Immutable)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Trust         │◀────│   Instant       │◀────│   Any           │
│   Established   │     │   Verification  │     │   Institution   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Key Principle

> **We don't store documents on-chain** – only their cryptographic fingerprints (SHA-256 hashes). This ensures privacy while providing tamper-proof verification.

---

## ✨ Features

### Core Features

| Feature | Description |
|---------|-------------|
| 🔐 **Secure Hash Generation** | Client-side SHA-256 cryptographic hashing - documents never leave your device |
| ⛓️ **Blockchain Storage** | Immutable storage on Polygon Amoy Testnet (upgradeable to Mainnet) |
| ✅ **Instant Verification** | Real-time document authenticity checks against blockchain records |
| 🚨 **Tamper Detection** | Any document modification results in hash mismatch |
| 🏛️ **Decentralized Ledger** | No single point of failure or control |
| 🏢 **Institution Management** | Access control for authorized financial institutions |

### Technical Features

- **MetaMask Integration** – Seamless Web3 wallet connection
- **Multi-Network Support** – Ethereum, Polygon Mainnet & Testnets
- **Real-time Transaction Tracking** – Block explorer links for transparency
- **Event Logging** – Complete audit trail on-chain
- **Gas Optimization** – Efficient Solidity smart contract design
- **Responsive UI** – Bank-friendly, professional interface

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.3.1 | Component-based UI framework |
| TypeScript | 5.x | Type-safe development |
| Tailwind CSS | 3.x | Utility-first styling |
| Vite | 5.x | Fast build tooling & HMR |
| Ethers.js | 6.16.0 | Blockchain interaction library |

### Blockchain & Cryptography
| Technology | Version | Purpose |
|------------|---------|---------|
| Solidity | ^0.8.19 | Smart contract language |
| Polygon Amoy | Testnet | Blockchain network |
| SHA-256 | - | Document hashing algorithm |
| Hardhat | 2.x | Contract development & deployment |

### Smart Contract Details
| Property | Value |
|----------|-------|
| **Contract Address** | `0x40b185d8c1e7124d829f2cD74530D4051c1295eD` |
| **Network** | Polygon Amoy Testnet (Chain ID: 80002) |
| **Explorer** | [View on PolygonScan](https://amoy.polygonscan.com/address/0x40b185d8c1e7124d829f2cD74530D4051c1295eD) |

---

## 🏗️ Architecture

```
DocVerifier/
├── contracts/
│   ├── DocVerifier.sol         # Main smart contract
│   ├── hardhat.config.js       # Hardhat configuration
│   ├── scripts/
│   │   └── deploy.js           # Deployment script
│   ├── package.json            # Contract dependencies
│   ├── .env.example            # Environment template
│   └── DEPLOY.md               # Deployment guide
├── src/
│   ├── assets/
│   │   └── docverifier-logo.png  # Application logo
│   ├── components/
│   │   ├── Header.tsx          # Navigation & wallet connection
│   │   ├── Hero.tsx            # Landing hero section
│   │   ├── Features.tsx        # Feature showcase
│   │   ├── HowItWorks.tsx      # Process explanation
│   │   ├── DocumentUpload.tsx  # Upload & hash generation
│   │   ├── DocumentVerify.tsx  # Verification interface
│   │   └── Footer.tsx          # Site footer
│   ├── lib/
│   │   ├── hashUtils.ts        # SHA-256 hash utilities
│   │   ├── web3Utils.ts        # Blockchain interaction utils
│   │   └── utils.ts            # General utilities
│   ├── pages/
│   │   ├── Index.tsx           # Main application page
│   │   └── NotFound.tsx        # 404 page
│   ├── App.tsx                 # Application root
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── public/
│   ├── docverifier-logo.png      # Favicon & OG image
│   └── robots.txt              # SEO configuration
├── index.html                  # HTML entry point
├── tailwind.config.ts          # Tailwind configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # Documentation
```

---

## 📜 Smart Contract

### Deployed Contract
- **Address**: `0x40b185d8c1e7124d829f2cD74530D4051c1295eD`
- **Network**: Polygon Amoy Testnet
- **Verified**: [View on PolygonScan](https://amoy.polygonscan.com/address/0x40b185d8c1e7124d829f2cD74530D4051c1295eD)

### Contract Functions

#### `storeDocument(bytes32 documentHash, string documentType, string documentId)`
Store a document hash on the blockchain.

**Parameters:**
- `documentHash`: SHA-256 hash of the document (bytes32 format)
- `documentType`: Category (e.g., "identity", "income", "address")
- `documentId`: External reference ID (e.g., "LOAN-2025-001")

**Access:** Only authorized institutions (owner can authorize)

**Events Emitted:** `DocumentStored(documentHash, uploader, timestamp, documentType, documentId)`

#### `verifyDocument(bytes32 documentHash)`
Verify if a document exists and retrieve its details.

**Returns:**
- `exists`: Boolean indicating if document is registered
- `uploader`: Address of the registering institution
- `timestamp`: Unix timestamp of registration
- `documentType`: Document category
- `documentId`: External reference

**Access:** Public (anyone can verify)

#### `isDocumentRegistered(bytes32 documentHash)`
Quick boolean check for document existence.

#### `authorizeInstitution(address institution)`
Grant an institution permission to store documents.

**Access:** Owner only

#### `revokeInstitution(address institution)`
Remove an institution's authorization.

**Access:** Owner only

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/bun
- **MetaMask** browser extension
- **Test MATIC** for gas fees (use [Polygon Faucet](https://faucet.polygon.technology/))

### Installation

```bash
# Clone the repository
git clone https://github.com/sakshi-chavan/docverifier.git
cd docverifier

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### MetaMask Setup

1. Install MetaMask browser extension
2. Add Polygon Amoy Testnet:
   - **Network Name**: Polygon Amoy Testnet
   - **RPC URL**: `https://rpc-amoy.polygon.technology`
   - **Chain ID**: 80002
   - **Symbol**: MATIC
   - **Explorer**: `https://amoy.polygonscan.com`
3. Get test MATIC from [Polygon Faucet](https://faucet.polygon.technology/)

---

## 📦 Deployment Guide

### Smart Contract Deployment

```bash
cd contracts

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your private key
# PRIVATE_KEY=your_wallet_private_key

# Deploy to Polygon Amoy
npm run deploy:amoy
```

See `contracts/DEPLOY.md` for detailed deployment instructions.

### Frontend Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📖 Usage

### For Financial Institutions (Document Registration)

1. **Connect Wallet** – Click "Connect Wallet" and approve MetaMask connection
2. **Switch Network** – Ensure you're on Polygon Amoy Testnet
3. **Upload Document** – Drag & drop or select a loan document
4. **View Hash** – System generates SHA-256 hash client-side
5. **Fill Details** – Select document type and enter reference ID
6. **Store on Blockchain** – Click "Store Hash" and confirm transaction
7. **Get Confirmation** – View transaction on block explorer

### For Document Verification

1. **Upload Document** – Drag & drop the document to verify
2. **OR Enter Hash** – Paste the SHA-256 hash directly
3. **Verify** – Click "Verify Document"
4. **View Results** – See registration status, uploader, timestamp, and metadata

---

## 🔒 Security Considerations

### Data Privacy

| On-Chain Storage | Off-Chain (Client-Side) |
|------------------|------------------------|
| # Document hash (SHA-256) | ❌ Actual document content |
| # Uploader address | ❌ Personal borrower info |
| # Timestamp | ❌ Sensitive financial data |
| # Document type/ID metadata | ❌ File contents |

### Security Features

- **Client-Side Hashing** – Documents never leave your device
- **Access Control** – Only authorized institutions can store
- **Immutability** – Once stored, records cannot be altered
- **Transparency** – All transactions visible on blockchain
- **Decentralization** – No single point of failure

---

## 💼 Commercial Viability

### Value Proposition

| Stakeholder | Benefit |
|-------------|---------|
| **Banks/NBFCs** | 70% reduction in verification time, fraud prevention |
| **Borrowers** | Faster loan approvals, single document submission |
| **Regulators** | Immutable audit trail, compliance automation |
| **Consortium** | Shared verification infrastructure, cost sharing |

### Scalability Potential

- **Phase 1**: Single institution deployment
- **Phase 2**: Consortium of 5-10 banks
- **Phase 3**: National banking network integration
- **Phase 4**: Cross-border document verification

### Efficiency Gains

| Metric | Before | After DocVerifier |
|--------|--------|-----------------|
| Verification Time | 3-5 days | Minutes |
| Fraud Detection | Manual audit | Instant |
| Inter-bank Trust | Phone calls | On-chain proof |
| Document Reuse | Re-submit each time | One-time registration |

### Potential Impact

- **Reduce NPAs** through fraud prevention
- **Enable digital lending** at scale
- **Support financial inclusion** with faster processing
- **Align with RBI digital banking initiatives**

---

## 🗺️ Roadmap

### Q1 2025 – Foundation ✅
- [x] Smart contract development
- [x] Frontend application
- [x] MetaMask integration
- [x] Testnet deployment

### Q2 2025 – Enhancement
- [ ] Multi-document batch processing
- [ ] Institution dashboard
- [ ] API for bank integration
- [ ] Mobile-responsive optimization

### Q3 2025 – Scale
- [ ] Mainnet deployment (Polygon)
- [ ] Bank pilot program
- [ ] Regulatory compliance module
- [ ] Analytics dashboard

### Q4 2025 – Expansion
- [ ] Multi-chain support
- [ ] KYC/AML integration
- [ ] Cross-border verification
- [ ] Consortium governance module

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Polygon Technology** for the scalable blockchain infrastructure
- **OpenZeppelin** for smart contract security patterns
- **Ethereum Community** for Web3 development resources

---

<div align="center">
  <img src="public/docverifier-logo.png" alt="DocVerifier" width="80"/>
  <p><strong>DocVerifier</strong> – Trust Through Transparency</p>
  <p>Built by <strong>Ronald Kipkurui</strong></p>
  <p><em>BSc. Science in Computer Science<br/>Kibabii University (KIBU)</em></p>
</div>
