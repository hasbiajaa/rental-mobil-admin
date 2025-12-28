import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Printer } from "lucide-react";
import { toast } from "sonner";
import type { Pesanan } from "../lib/data";

interface InvoiceGeneratorProps {
  pesanan: Pesanan;
}

const generateInvoiceHTML = (pesanan: Pesanan) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Invoice #${pesanan.id}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: auto;
      background: white;
      padding: 30px;
    }
    h1 {
      text-align: center;
      color: #4f46e5;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    th {
      background: #f3f4f6;
    }
    .total {
      font-weight: bold;
      background: #eef2ff;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Bukti Penyewaan Mobil</h1>

    <p><strong>Invoice:</strong> #${pesanan.id}</p>
    <p><strong>Nama:</strong> ${pesanan.customerName}</p>
    <p><strong>No HP:</strong> ${pesanan.customerPhone}</p>

    <hr />

    <p><strong>Mobil:</strong> ${pesanan.carModel}</p>
    <p><strong>Plat:</strong> ${pesanan.carPlate}</p>
    <p><strong>Durasi:</strong> ${pesanan.totalDays} hari</p>

    <table>
      <tr>
        <th>Deskripsi</th>
        <th>Harga</th>
      </tr>
      <tr>
        <td>Sewa mobil</td>
        <td>Rp ${pesanan.pricePerDay.toLocaleString("id-ID")}</td>
      </tr>
      <tr class="total">
        <td>Total</td>
        <td>Rp ${pesanan.totalPrice.toLocaleString("id-ID")}</td>
      </tr>
    </table>

    <p style="margin-top:20px;text-align:center;">
      Terima kasih telah menggunakan layanan kami
    </p>
  </div>
</body>
</html>
`;

export function InvoiceGenerator({ pesanan }: InvoiceGeneratorProps) {
  const handleDownloadInvoice = () => {
    const html = generateInvoiceHTML(pesanan);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice_${pesanan.id}.html`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Invoice berhasil diunduh");
  };

  const handlePrintInvoice = () => {
    const win = window.open("", "_blank");
    if (!win) return;

    win.document.write(generateInvoiceHTML(pesanan));
    win.document.close();
    win.print();
  };

  return (
<div className="flex gap-2">
  <Button
    variant="outline"
    size="sm"
    className="border-blue-500 text-blue-600 hover:bg-blue-50"
    onClick={handleDownloadInvoice}
  >
    <Download className="size-4 mr-1" />
    Download
  </Button>

  <Button
    variant="outline"
    size="sm"
    className="border-green-500 text-green-600 hover:bg-green-50"
    onClick={handlePrintInvoice}
  >
    <Printer className="size-4 mr-1" />
    Print
  </Button>
</div>
  )
}
