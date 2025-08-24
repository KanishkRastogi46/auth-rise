import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import 'dotenv/config'

/**
 * @desc Generic HTTP client to make requests to other services
 * @param service Name of the service
 * @param endpoint Endpoint of the service
 * @param method Which HTTP method to use
 * @param data Payload for POST, PUT, PATCH requests
 * @param headers Headers to include in the request
 * @returns AxiosResponse
 */
export async function httpClient<T>(
    service: string,
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    data?: T,
    headers?: Record<string, string>,
) {
    try {
        const axiosInstance = axios.create()
        const baseURL = process.env.BASE_URL
        const url = `${baseURL}${service}${endpoint}`

        const requestConfig: AxiosRequestConfig = {
            baseURL,
            url,
            method,
            data,
            ...(method === 'GET') ? { headers: { 'Accept': 'application/json', ...headers } } : { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', ...headers } },
        }

        const response: AxiosResponse = await axiosInstance(requestConfig)
        return response
    } catch (error) {
        console.error('HTTP Client Error:', error)
        throw error
    }
}
