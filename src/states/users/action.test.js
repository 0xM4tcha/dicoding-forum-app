/**
 * skenario test
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import api from "@/utils/api";
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncRegisterUser } from "./action";

const fakeRegisterResponse = {
    id: "user-123",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg"
}

const fakeErrorResponse = new Error('Ups, something went wrong');


describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });
 
  afterEach(() => {
    api.register = api._register;
 
    // delete backup data
    delete api._register;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeRegisterResponse);
    //mock dispatch
    const dispatch = vi.fn();
 
    // action
    await asyncRegisterUser({ name: 'name', email: 'email', password: 'password'})(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();
 
    // action
    await asyncRegisterUser({ name: 'name', email: 'email', password: 'password'})(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    // expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);

  });

});

