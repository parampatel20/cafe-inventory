function loadSidebar(activePage) {
  const user    = getUser();
  const isAdmin = user.role === 'admin';

  document.getElementById('sidebar').innerHTML = `
    <div class="sidebar-logo">☕ Café Inventory</div>
    <ul class="sidebar-menu">
      <li><a href="/pages/dashboard.html"   class="${activePage==='dashboard'  ?'active':''}">🏠 Dashboard</a></li>
      <li><a href="/pages/inventory.html"   class="${activePage==='inventory'  ?'active':''}">☕ Café Stock</a></li>
      <li><a href="/pages/add-item.html"    class="${activePage==='add-item'   ?'active':''}">➕ Add Café Item</a></li>
      <li><a href="/pages/godown.html"      class="${activePage==='godown'     ?'active':''}">🏭 Godown Stock</a></li>
      <li><a href="/pages/add-godown.html"  class="${activePage==='add-godown' ?'active':''}">➕ Add Godown Item</a></li>
      <li><a href="/pages/transfer.html"    class="${activePage==='transfer'   ?'active':''}">🔄 Transfer Stock</a></li>
      <li><a href="/pages/bills.html"       class="${activePage==='bills'      ?'active':''}">🧾 Bills</a></li>
      <li><a href="/pages/upload-bill.html" class="${activePage==='upload-bill'?'active':''}">📤 Upload Bill</a></li>
      <li><a href="/pages/categories.html"  class="${activePage==='categories' ?'active':''}">📂 Categories</a></li>
      ${isAdmin ? `
      <li><a href="/pages/staff.html"       class="${activePage==='staff'      ?'active':''}">👥 Staff</a></li>
      ` : ''}
      <li><a href="#" onclick="logout()">🚪 Logout (${user.name || 'User'})</a></li>
    </ul>
  `;
}