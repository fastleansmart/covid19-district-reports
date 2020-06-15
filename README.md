# covid19-district-reports

Example app for reporting Covid-19 case numbers to a stub API.

## The API

Create a local docker image from the sources

    $ cd backend
    $ docker build -t covid19-district-reports/backend .

The API can be launched in a docker container and exposes port 8070.

    docker run --rm -p 8070:8070 -e ERROR_PROBABILITY=0 covid19-district-reports/backend

This starts the container and publishes the api at port 8070. A request to http://localhost:8070/districts?federalStateId=1 will return a list of districts.
The endpoints are:

- [GET] /federal-states
- [GET] /districts?federalStateId=<id from above endpoint>
- [GET] /reports // list of summarized data for federal states
- [GET] /reports?federalStateId=<id from above endpoint> // list of summarized data for districts
- [POST] /reports

The reports structure for a post is:

    {
        district_id: number
        date: datetime (ISO 8601 2020-06-09T13:22:32Z)
        infects: number
        healed: number
        died: number
    }

To create a new report with curl it looks like this

    curl -X POST localhost:7000/reports -d '{ "district_id":1, "infects":10, "healed": 0, "died": 5 }'

## The Frontend

The frontend can be launched in a docker container and exposes port 7000.

    docker run --name frontend --rm -p 8080:3000 covid19-district-reports/frontend

This starts the container and publishes the API at port 8080. A request to http://localhost:8080/ will show the frontend web page.
The frontend itself is based on the create-react-app project and supports its commands:

- `yarn start` for development
- `yarn build` for running a production build of the app
- `yarn test` for running all tests (for the frontend project)
- `yarn eject` for ejecting out of the create-react-app ecosystem

## Putting it all together

Both services can be started simultaneously using `docker-compose`. We added a `docker-compose.yml`. So executing the following command will start both the backend and the frontend container:

    docker-compose up

Happy hacking!
