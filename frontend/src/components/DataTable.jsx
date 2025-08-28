import React from "react";


export default function DataTable({ fields, rows, onEdit, onDelete }) {
return (
<table className="table">
<thead>
<tr>
{fields.map((f) => (
<th key={f.field_name}>{f.field_label}</th>
))}
<th>Actions</th>
</tr>
</thead>
<tbody>
{rows.map((r, idx) => (
<tr key={idx}>
{fields.map((f) => (
<td key={f.field_name}>{r[f.field_name]}</td>
))}
<td>
<button className="button" onClick={() => onEdit(r)}>Edit</button>
<button className="button" onClick={() => onDelete(r)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
);
}