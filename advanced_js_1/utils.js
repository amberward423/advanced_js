async function fetchData(baseUrl, options) {
  try {
    const response = await fetch(baseUrl, options)
    if (!response.ok) {
      throw new Error('Invalid input!');
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error.message);
    throw error;
  } finally {
    // finally = this is executed anyway, whether the execution was successful or not
    console.log('asynchronous load complete');
  }
}

export {fetchData};
