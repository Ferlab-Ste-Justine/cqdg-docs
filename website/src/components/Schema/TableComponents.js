/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { Button } from '../Button';

export const Script = ({
  script,
  name,
  diff,
  showScript,
}) => {
  return (
    <div>
      {diff ? (
        <Button
          type="secondary"
          onClick={() =>
            showScript({
              diff: { left: diff.left, right: diff.right },
              fieldName: name,
            })
          }
        >
          View Script Updates
        </Button>
      ) : script ? (
        <Button
          type="secondary"
          onClick={() => {
            showScript({
              fieldName: name,
              content: script,
            });
          }}
        >
          View Script
        </Button>
      ) : null}
    </div>
  );
};