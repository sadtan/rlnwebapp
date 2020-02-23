module.exports.ResHandler = () => 
{
    var responseFormat = 
    {
        success: '',
        status: '',
        data: [],
        error: [],
        message: ''
    }

    class ResHandler
    {
        constructor() {}

        setResponse(status = 404, error = null,  data = null)
        {
            if (error)
            {
                return {
                    ...responseFormat,
                    status,
                    error,
                    data: [],
                    success: false,
                    message: error.message
                }
            } else 
            {
                return {
                    ...responseFormat,
                    status, 
                    data,
                    success: true
                }
            }
        }

        handleJsonResponse(res, resFormat)
        {
            return res.status(resFormat.status).json(resFormat);
        }

        handleRenderResponse(res, resFormat, viewFile)
        {
            return res.render(viewFile, {data: resFormat.data})
        }

        handleResponse(req, res, resFormat, viewFile)
        {
            if (req.headers['content-type'] == 'application/json')
                return res.status(resFormat.status).json(resFormat);

            return res.render(viewFile, {data: resFormat.data})
        }
    }

    return ResHandler;
}

