chroot /host "netstat" "-tup" 2> /dev/null # Simply run netstat and redirect the errors to null, because there is a warning that takes up space in the log otherwise.
