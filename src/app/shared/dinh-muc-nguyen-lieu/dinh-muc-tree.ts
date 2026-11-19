// API data stays nested in listItem; TreeNodes only contain display state.
export function visitDinhMucRows(rows: any[], visit: (row: any) => void) {
  (rows || []).forEach(row => {
    visit(row);
    visitDinhMucRows(row.listItem, visit);
  });
}

export function buildDinhMucTree(rows: any[], previous: any[], createId: () => string): any[] {
  const expanded = new Map<any, boolean>();
  const remember = (nodes: any[]) => nodes.forEach(node => {
    expanded.set(node.data.Id, node.expanded !== false);
    remember(node.children || []);
  });
  remember(previous);
  const normalize = (items: any[], parentId: any) => {
    items.forEach(row => {
      row.Id = row.Id || createId();
      if (!Array.isArray(row.listItem)) row.listItem = [];
    });
    // Accept older flat responses, but emit only nested rows.
    const byId = new Map<any, any>(items.map(row => [row.Id, row] as [any, any]));
    const moved = new Set<any>();
    items.forEach(row => {
      const parent = byId.get(row.IdParent);
      if (!parent || parent === row) return;
      const seen = new Set<any>([row.Id]);
      let ancestor = parent;
      while (ancestor) {
        if (seen.has(ancestor.Id)) return;
        seen.add(ancestor.Id);
        ancestor = byId.get(ancestor.IdParent);
      }
      if (!parent.listItem.some(child => child === row || child.Id === row.Id)) {
        parent.listItem.push(row);
      }
      moved.add(row);
    });
    for (let i = items.length - 1; i >= 0; i--) {
      if (moved.has(items[i])) items.splice(i, 1);
    }
    items.forEach(row => {
      row.IdParent = parentId;
      normalize(row.listItem, row.Id);
    });
  };
  normalize(rows, null);
  const build = (items: any[], prefix = '') => items.map((row, index) => {
    const label = prefix + (index + 1);
    return {
      data: row,
      label,
      expanded: expanded.get(row.Id) !== false,
      children: build(row.listItem, label + '.')
    };
  });
  return build(rows);
}

export function removeDinhMucRow(rows: any[], target: any): boolean {
  const index = rows.indexOf(target);
  if (index >= 0) {
    rows.splice(index, 1);
    return true;
  }
  return rows.some(row => removeDinhMucRow(row.listItem || [], target));
}
