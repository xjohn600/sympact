process.on('uncaughtException', err => {
  process.send({event: 'error', error: plain(err)});
});

process.on('unhandledRejection', reason => {
  process.send({event: 'error', error: plain(reason)});
});

process.on('message', async msg => {
  if (typeof msg !== 'object' && msg.event !== 'run') return;
  try {
    const start = Date.now();
    await run();
    const end = Date.now();
    process.send({event: 'after', start, end});
  } catch (err) {
    process.send({event: 'error', error: plain(err)});
  }
});

setTimeout(() => {
  process.send({event: 'ready'});
}, 1000);

function plain(obj) {
  const plainObject = {};
  Object.getOwnPropertyNames(obj).forEach(key => {
    plainObject[key] = obj[key];
  });
  return plainObject;
}

async function run() {
  /* CODE */
}
