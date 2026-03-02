// import { useState } from 'react';
// import type { User, FormData, Mode, ActiveFilter } from '../types/index';

// // ─── THINK: Initial values live outside component ──────────────────────
// // Why? So resetForm can always reference the same object
// // If defined inside component, new reference created every render
// const initialFormData: FormData = {
//   userName: '',
//   cityName: '',
//   ageData: '',
// };

// const initialFilter: ActiveFilter = {
//   field: '',
//   value: '',
// };

// function StatePage() {
//   // ─── STATE ─────────────────────────────────────────────────────────
//   // TypeScript knows exactly what type each state variable is
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedId, setSelectedId] = useState<number | null>(null);
//   const [mode, setMode] = useState<Mode>('save');
//   const [formData, setFormData] = useState<FormData>(initialFormData);
//   const [activeFilter, setActiveFilter] = useState<ActiveFilter>(initialFilter);

//   // ─── DERIVED STATE — calculated during render, not stored ──────────
//   // THINK: What users should the table show?
//   // If filter is active → show filtered, else show all
//   const displayedUsers: User[] =
//     activeFilter.field && activeFilter.value
//       ? users.filter(
//           (user) =>
//             String(user[activeFilter.field as keyof User])
//               .toLowerCase() === activeFilter.value.toLowerCase()
//         )
//       : users;

//   // THINK: What unique values exist for the selected field?
//   // Extract all values for that field, remove duplicates with Set
//   const uniqueValues: string[] =
//     activeFilter.field
//       ? [
//           ...new Set(
//             users.map((user) =>
//               String(user[activeFilter.field as keyof User])
//             )
//           ),
//         ]
//       : [];

//   // ─── HANDLERS ──────────────────────────────────────────────────────

//   // THINK: Any input change → update only that field in formData
//   // e.target.name must match the keys in FormData interface
//   function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   }

//   // THINK: Form submit handles both save and update based on mode
//   function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
//     e.preventDefault();

//     // FormData API reads values using the input's name attribute
//     const data = new FormData(e.currentTarget);
//     const userName = (data.get('userName') as string).trim();
//     const cityName = (data.get('cityName') as string).trim();
//     const ageData = Number(data.get('ageData'));

//     // Validate before doing anything
//     if (!userName || !cityName || ageData <= 0) {
//       alert('Enter valid input');
//       return;
//     }

//     if (mode === 'save') {
//       const newUser: User = {
//         id: +new Date(),
//         userName,
//         cityName,
//         ageData,
//       };
//       setUsers((prev) => [...prev, newUser]);
//     }

//     if (mode === 'update') {
//       // THINK: Map over users — if id matches, return updated user, else return unchanged
//       setUsers((prev) =>
//         prev.map((user) =>
//           user.id === selectedId
//             ? { ...user, userName, cityName, ageData }
//             : user
//         )
//       );
//     }

//     resetForm();
//   }

//   // THINK: User picks an ID from dropdown
//   // → find that user → fill form → switch to update mode
//   function handleSelectId(e: React.ChangeEvent<HTMLSelectElement>): void {
//     const id = Number(e.target.value);

//     if (!id) {
//       resetForm();
//       return;
//     }

//     const user = users.find((u) => u.id === id);
//     if (!user) return;

//     setSelectedId(id);
//     setMode('update');
//     setFormData({
//       userName: user.userName,
//       cityName: user.cityName,
//       ageData: String(user.ageData), // convert back to string for input
//     });
//   }

//   // THINK: User picks a field to filter by
//   // → store field in activeFilter → reset value (old value may not exist in new field)
//   function handleFieldChange(e: React.ChangeEvent<HTMLSelectElement>): void {
//     const field = e.target.value;
//     setActiveFilter({ field, value: '' });
//   }

//   // THINK: User picks a unique value to filter by
//   // → store value in activeFilter alongside existing field
//   function handleUniqueValueChange(
//     e: React.ChangeEvent<HTMLSelectElement>
//   ): void {
//     setActiveFilter((prev) => ({ ...prev, value: e.target.value }));
//   }

//   // THINK: Filter button clicked → activeFilter already has field + value
//   // displayedUsers derived value will automatically recalculate
//   function handleFilter(): void {
//     if (!activeFilter.field || !activeFilter.value) {
//       alert('Select a field and value to filter');
//       return;
//     }
//     // No extra logic needed here — displayedUsers derives from activeFilter
//     // Just validate and let derived state do the work
//   }

//   // THINK: All button → clear filter → displayedUsers shows all users
//   function handleShowAll(): void {
//     setActiveFilter(initialFilter);
//   }

//   // THINK: Delete → remove from array by id → reset form
//   function handleDelete(): void {
//     setUsers((prev) => prev.filter((u) => u.id !== selectedId));

//     // If filter was on deleted user's value, clear the filter too
//     setActiveFilter(initialFilter);
//     resetForm();
//   }

//   // THINK: Reset → back to initial state for form, mode, selectedId
//   function resetForm(): void {
//     setFormData(initialFormData);
//     setMode('save');
//     setSelectedId(null);
//   }

//   // ─── DYNAMIC FIELD OPTIONS ─────────────────────────────────────────
//   // THINK: The requirement says fields must be dynamic
//   // If you add a new field to User interface, it should appear automatically
//   // So we derive field names from an actual user object's keys
//   // We exclude 'id' because we don't want to filter by id
//   const filterableFields: string[] =
//     users.length > 0
//       ? Object.keys(users[0]).filter((key) => key !== 'id')
//       : ['userName', 'cityName', 'ageData']; // fallback when no users yet

//   // ─── RENDER ────────────────────────────────────────────────────────
//   return (
//     <div>
//       <h2>State Route</h2>

//       {/* FORM */}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name: </label>
//           <input
//             type="text"
//             name="userName"
//             value={formData.userName}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div>
//           <label>City: </label>
//           <input
//             type="text"
//             name="cityName"
//             value={formData.cityName}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div>
//           <label>Age: </label>
//           <input
//             type="number"
//             name="ageData"
//             value={formData.ageData}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Buttons switch based on mode */}
//         {mode === 'save' && <button type="submit">Save</button>}
//         {mode === 'update' && (
//           <>
//             <button type="submit">Update</button>
//             <button type="button" onClick={handleDelete}>
//               Delete
//             </button>
//           </>
//         )}
//       </form>

//       {/* ID SELECTOR */}
//       <div>
//         <label>Select based on ID: </label>
//         <select
//           onChange={handleSelectId}
//           value={selectedId ?? ''}
//         >
//           <option value="">Select ID</option>
//           {users.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.id}
//             </option>
//           ))}
//         </select>
//       </div>

//       <hr />

//       {/* FILTER PANEL */}
//       <h3>Filters</h3>

//       <div>
//         <label>Select Field: </label>
//         <select
//           value={activeFilter.field}
//           onChange={handleFieldChange}
//         >
//           <option value="">Select Field</option>
//           {filterableFields.map((field) => (
//             <option key={field} value={field}>
//               {field}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label>Unique Values: </label>
//         <select
//           value={activeFilter.value}
//           onChange={handleUniqueValueChange}
//           disabled={!activeFilter.field}
//         >
//           <option value="">Select Value</option>
//           {uniqueValues.map((val) => (
//             <option key={val} value={val}>
//               {val}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <button type="button" onClick={handleFilter}>
//           Filter
//         </button>
//         <button type="button" onClick={handleShowAll}>
//           All
//         </button>
//       </div>

//       <hr />

//       {/* TABLE */}
//       <table border={1}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>City</th>
//             <th>Age</th>
//           </tr>
//         </thead>
//         <tbody>
//           {displayedUsers.map((user) => (
//             <tr key={user.id}>
//               <td>{user.userName}</td>
//               <td>{user.cityName}</td>
//               <td>{user.ageData}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default StatePage;
