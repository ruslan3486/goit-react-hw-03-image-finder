import React, { Component, createRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
const MODAL_ROOT = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }
  backdropRef = createRef();

  handleKeyPress = (e) => {
    console.log(e);

    if (e.code !== "Escape") {
      return;
    }
    this.props.onClose();
  };
  handleBackdropClick = (e) => {
    if (this.backdropRef.current && e.target !== this.backdropRef.current) {
      return;
    }

    this.props.onClose();
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <div
        className={styles.Overlay}
        ref={this.backdropRef}
        onClick={this.props.onClose}
        role="presentation"
      >
        <div className={styles.Modal}>{children}</div>
      </div>,
      MODAL_ROOT
    );
  }
}
