let line_status_g = 0;

export const registerLineHandlers = (io, socket) => {
    
    const getStatus = () => {
        console.log("get status, " + line_status_g);
        socket.emit('line:status', line_status_g)
    }

    const setStatus = (status) => {
        line_status_g = status;
        socket.broadcast.emit('line:status', line_status_g);
        console.log("set status, " + line_status_g);
    }

    socket.on("line:get", getStatus);
    socket.on("line:set", setStatus);
};
