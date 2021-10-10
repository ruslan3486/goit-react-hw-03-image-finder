import { Component } from "react";
import { toast } from "react-toastify";
import styles from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    SearchName: "",
  };

  handleNameChange = (event) => {
    this.setState({ SearchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.SearchName.trim() === "") {
      toast.error("Wow so easy!");
      return;
    }
    this.props.onSubmit(this.state.SearchName);
    this.setState({ SearchName: "" });
  };
  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.SearchName}
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
