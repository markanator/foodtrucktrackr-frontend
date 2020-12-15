import React from 'react';

export default function AddMenuItem(props) {
  return (
    <button
      type="button"
      onClick={props.showMenuModal}
      className="justify-content-center p-2 h-100 text-center menu-item"
    >
      <i className="fas fa-plus" />
      <p>Add Item</p>
    </button>
  );
}
