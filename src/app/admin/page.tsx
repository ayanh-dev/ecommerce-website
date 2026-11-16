import { PencilLine, PackageCheck, Settings, Trash2 } from "lucide-react";

const inventoryRows = [
  ["Samsung Galaxy M35 5G", "Mobiles", "28", "₹18,999"],
  ["LG Ultra HD 55-inch Smart TV", "Electronics", "8", "₹42,999"],
  ["Linen 3-Seater Sofa", "Home & Furniture", "9", "₹26,999"],
  ["Voltas 1-Ton Inverter AC", "Appliances", "17", "₹32,999"],
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Protected route</p>
          <h1 className="text-3xl font-bold text-slate-900">Seller Admin Dashboard</h1>
        </div>
        <button className="rounded-xl bg-[#2874F0] px-4 py-2 text-sm font-semibold text-white">Add Product</button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          ["Products", "184", "Live listings"],
          ["Orders", "39", "This week"],
          ["Revenue", "₹8.4L", "Monthly"],
        ].map(([title, value, text]) => (
          <div key={title} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{title}</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{value}</div>
            <div className="mt-2 text-xs text-slate-500">{text}</div>
          </div>
        ))}
      </div>

      <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <PackageCheck className="h-5 w-5 text-[#2874F0]" />
          <h2 className="text-xl font-bold text-slate-900">Inventory Management</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryRows.map(([product, category, stock, price]) => (
                <tr key={product} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium text-slate-900">{product}</td>
                  <td className="px-4 py-3">{category}</td>
                  <td className="px-4 py-3">{stock}</td>
                  <td className="px-4 py-3">{price}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="rounded p-2 hover:bg-slate-100"><PencilLine className="h-4 w-4" /></button>
                      <button className="rounded p-2 hover:bg-slate-100"><Settings className="h-4 w-4" /></button>
                      <button className="rounded p-2 hover:bg-red-50 text-red-500"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
