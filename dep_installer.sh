cd /src/server
npm install
touch .env

read -p "Enter server port" P
read -p "Enter DB Admin Name" DBN
read -p "Enter DB Password Access" PSS
read -p "Enrter DB Name" DB
read -p "Enter JWT Secret" SCR

echo $DBN


{
        echo PORT=$P
        echo NODE_ENV=dev
        echo UNAME=$DBN
        echo MPWD=$PSS
        echo DBNAME=$DB
        echo JWT_SECRET=$SCR
        echo SALT=10
        echo TOKEN_EXPIRATION=2d
        echo COOKIE_EXPIRATION=2
} >> .env

mkdir public
cd public
mkdir data

cd ..
cd ..

cd /client
npm install

cd /ml
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt