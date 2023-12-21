useEffect(() => {
  // Your function to be executed once on component mount
  console.log('Component has mounted. Executing function once.');
  
  // Example: You can perform any initialization or side effect here

  // If you need to clean up any resources when the component is unmounted,
  // you can return a cleanup function from the useEffect
  return () => {
    console.log('Component will unmount. Cleaning up if needed.');
    // Example: Cleanup logic goes here
  };
}, []); 