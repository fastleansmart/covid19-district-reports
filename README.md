# covid19-district-reports

Example app for reporting Covid-19 case numbers to a stub API.

## The API

The API can be launched in a docker container and exposes port 7000.

    docker run --rm -p 8070:7000 covid19-district-reports/backend

This starts the container and publishes the api at port 8070. A request to http://localhost:8070/districts?federalStateId=1 will return a list of districts.
The endpoints are:

- [GET] /federal-states
- [GET] /districts?federalStateId=<id from above endpoint>
- [GET] /reports
- [POST] /reports

The reports structure for a post is:

    {
        district_id: number
        count: number
    }

To create a new report with curl it looks like this

    curl -X POST localhost:7000/reports -d '{ "district_id":1, "count":10 }'


## The Frontend

The frontend can be launched in a docker container and exposes port 7000.

    docker run --rm -p 8080:7000 covid19-district-reports/frontend

This starts the container and publishes the API at port 8080. A request to http://localhost:8080/ will show the frontend web page.
The frontend itself is based on the create-react-app project and supports its commands:

- `npm start` for development
- `npm build` for running a production build of the app
- `npm test` for running all tests (for the frontend project)
- `npm eject` for ejecting out of the create-react-app ecosystem