# Technical Assignment Answers

## 1. Setup Description and Decisions Made

### Core Technology and Architecture

* **Core:** **React + TypeScript**
    * *Rationale:* Standard for large applications, ensuring type safety and robust code structure.
* **State Management:** **Redux Toolkit (RTK)**
    * *Rationale:* Reliable tool for managing global state, primarily used for Authentication (`authSlice`).
* **API Handling:** **RTK Query**
    * *Rationale:* Modern and powerful abstraction for handling asynchronous data. Automatically manages caching, loading states, and invalidation (essential for simulating CRUD operations).
* **Routing:** **React Router DOM v6**
    * *Rationale:* Provides secure route protection (`<ProtectedRoute/>`) and supports nested URL structures for forms (e.g., `/products/edit/:id`).

### UI and Styling Choices

* **Styling:** **Material UI (MUI) + CSS Modules**
    * *Rationale:* MUI provides high-quality, ready-to-use, and accessible components (Tables, Forms, Dialogs). CSS Modules is used for precise control over the overall grid and layout structure, preventing style conflicts.
* **Magasin Identity:** **Customizing MUI Theme**
    * *Rationale:* The primary color for buttons, navigation, and accents has been set to red (`#D31D33`) to align with the Magasin visual style.

---

## 2. Next Steps for Production Readiness

The following items are recommended to prepare the project for a production environment:

* **Error Handling:** Add comprehensive network error handling (e.g., 404, 500 responses) at the API slice level and display detailed, user-friendly error messages in the UI.
* **Form Validation:** Implement a dedicated library for robust form validation (e.g., **Yup** with **Formik** or **React Hook Form**) for create and edit functionalities.
* **Pagination/Filtering:** The API supports `limit` and `skip`. This must be implemented to manage large data sets efficiently and improve performance for product and user listings.
* **Token Refresh:** If the API requires it, logic for **automatic token renewal** (using a `refreshToken`) should be implemented within RTK Query's `baseQuery` configuration.
* **Testing:** Add a complete suite of unit tests (Jest) and integration tests (React Testing Library) for all core components and Redux logic.

---

## 3. Unimplemented Parts and Future Improvements

### Functional and UX/UI Enhancements

| Category | Description | Future Improvement |
| :--- | :--- | :--- |
| **UX/UI** | Lack of complex styling elements (custom shadows, precise typography). | Detailed customization of the MUI theme to match the `magasin.dk` visual identity (custom color palette, specific fonts). |
| **CRUD Operations** | The DummyJSON API does not perform actual Create/Update/Delete operations on the server side. | Refactoring forms to handle more complex data types (image uploads, nested addresses, company structures). |
| **Functionality** | Missing key features like image upload, advanced filtering, and global search. | Implement a search bar and dedicated filters (by category, age, etc.). |
| **Performance** | The application currently loads the maximum available list (30 records) on page load. | Implement `skip` and `limit` parameters consistently across all RTK Query requests to enable proper pagination. |