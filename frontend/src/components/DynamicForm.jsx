import React, { useState } from "react";


export default function DynamicForm({ fields, onSubmit, initialData = {} }) {
const [form, setForm] = useState(initialData);


const handleChange = (name, value) => {
setForm((f) => ({ ...f, [name]: value }));
};


return (
<form
onSubmit={(e) => {
e.preventDefault();
onSubmit(form);
}}
>
{fields.map((f) => (
<div key={f.field_name}>
<label>{f.field_label}</label>
<input
className="input"
type={f.field_type === "number" ? "number" : "text"}
placeholder={f.input_placeholder || ""}
value={form[f.field_name] || ""}
onChange={(e) => handleChange(f.field_name, e.target.value)}
/>
</div>
))}
<button className="button" type="submit">
Save
</button>
</form>
);
}