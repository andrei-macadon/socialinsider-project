import {
  API_URL,
  PayloadResponseCombined,
  Post,
  PostsPayload,
  PostsRequestPayload,
  headers,
} from './utils.js'
import express, { Application, NextFunction, Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import cors from 'cors'
import { config } from 'dotenv'

config()

const app: Application = express()
const PORT = 3001

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`))

app.post('/brands', (req: Request, res: Response) => {
  axios
    .post(API_URL, req.body, {
      headers: headers,
    })
    .then((api_response) => {
      console.log(api_response.data.result[0].profiles)
      res.send(api_response.data)
    })
})

app.post('/posts', (req: Request, res: Response, next: NextFunction) => {
  let postsPayloadRequest: PostsRequestPayload = req.body

  let payloadResp: PayloadResponseCombined = new PayloadResponseCombined()
  const requests = postsPayloadRequest.brand!.profiles.map((profile) => {
    let requestBody = postsPayloadRequest.siRequest
    requestBody.params.id = profile.id
    requestBody.params.profile_type = profile.profile_type
    return axios.post(API_URL, requestBody, {
      headers: headers,
    })
  })

  axios.all(requests).then((responses: AxiosResponse<PostsPayload>[]) => {
    responses.forEach((response: AxiosResponse<PostsPayload>, idx: number) => {
      let resp = response.data.resp
      payloadResp.totalNoOfPosts! += resp.total

      resp.posts!.map((post) =>
        payloadResp.posts!.push(
          new Post(
            post,
            postsPayloadRequest.brand!.profiles[idx].id,
            postsPayloadRequest.brand!.profiles[idx].profile_type
          )
        )
      )
    })

    // sortare in ordine crescatoare dupa date
    payloadResp.posts!.sort((p1: Post, p2: Post) => {
      let d1 = new Date(p1.post!.date)
      let d2 = new Date(p2.post!.date)
      return d1.getTime() > d2.getTime()
        ? 1
        : d1.getTime() < d2.getTime()
        ? -1
        : 0
    })

    payloadResp.posts!.length = 10
    console.log(
      'The final response is: ' + JSON.stringify(payloadResp) + '\n\n'
    )
    return res.send(payloadResp)
  })
})
