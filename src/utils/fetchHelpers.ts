import axios, { AxiosResponse } from 'axios';
import { tenorKey, exchangeRateAccessKey } from '../../config.json';
import { CovidData, CurrencyExchangeRate, TenorAPIResponse } from './APIResponses';

export const fetchGIF = async (searchParam: string): Promise<string> => {
  try {
    const gifs: AxiosResponse<TenorAPIResponse> = await axios.get(
      `https://api.tenor.com/v1/search?q=${searchParam}&key=${tenorKey}&limit=50`,
    );
    const index = Math.floor(Math.random() * gifs.data.results.length);
    return Promise.resolve(gifs.data.results[index].url);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const fetchCovid = async (): Promise<CovidData> => {
  try {
    const response = await axios.get(
      'https://disease.sh/v3/covid-19/countries/Poland?strict=true',
    );
    return Promise.resolve(response.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const fetchCurrencyExchangeRates = async (): Promise<CurrencyExchangeRate> => {
  try {
    const response = await axios.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${exchangeRateAccessKey}`,
    );
    return Promise.resolve(response.data);
  } catch (e) {
    return Promise.reject(e);
  }

}
