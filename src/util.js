/**
 * Restore component state from persistent storage on initialization.
 *
 */
export function hydrateState () {
  // for all items in state
  Object.keys(this.state).forEach((key) => {
    // if the key exists in localStorage
    if (localStorage.hasOwnProperty(key)) {
      // get the key's value from localStorage
      let value = localStorage.getItem(key);
      console.log (" setting " + key + " => " + value);
      // parse the localStorage string and setState
      const cb = () => console.log (" set " + key + " => " + this.state[key]);
      try {
        value = JSON.parse(value);
        this.setState({ [key]: value }, cb);
      } catch (e) {
        // handle empty string.
        console.log (" setting " + key + " => " + value);
        this.setState({ [key]: value }, cb);
      }
    }
  });
}
