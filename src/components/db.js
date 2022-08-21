const db = async () => {
  // Check for support.
  if (!('indexedDB' in window)) {
    console.log("This browser doesn't support IndexedDB.");
    return;
  }

  if (navigator.storage && navigator.storage.estimate) {
    const quota = await navigator.storage.estimate();
    // quota.usage -> Number of bytes used.
    // quota.quota -> Maximum number of bytes available.
    const percentageUsed = (quota.usage / quota.quota) * 100;
    console.log(`You've used ${percentageUsed}% of the available storage.`);
    const remaining = quota.quota - quota.usage;
    console.log(`You can write up to ${remaining} more bytes.`);
  }
}

export default db;