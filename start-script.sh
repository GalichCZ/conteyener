clientDirectory="/home/galich/Desktop/freelance/conteyener/client"
cd "$clientDirectory"

echo "Starting client app..."
yarn vite &

serverDirectory="/home/galich/Desktop/freelance/conteyener/server"
cd "$serverDirectory"

# echo "Starting server..."
# npm run dev &

echo "Opening termial..."
gnome-termial --title="Server Process" --bash -c "cd \"$serverDirectory\"; echo 'Server Process'; echo; ps -ef | grep 'npm run dev'; read line"