import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import InfoCardEntry from './InfoCardListEntryUser.jsx';

const InfoCardList = ({ book }) =>
// console.log(bookData, 'DATA');

  (
    <div>
      <InfoCardEntry book={book} />
    </div>
  );
export default InfoCardList;
