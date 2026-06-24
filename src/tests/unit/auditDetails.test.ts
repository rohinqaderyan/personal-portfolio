import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '@/app/api/auditdetails/updatecategory/route';
import { PUT as updateTestCasePUT } from '@/app/api/auditdetails/updatetestcase/route';
import { PUT as saveGMPAuditCategoryPUT } from '@/app/api/auditdetails/savegmpauditcategory/route';

// Mock the error handler module
vi.mock('@/lib/api/errorHandler', async () => {
  const actual = await vi.importActual('@/lib/api/errorHandler');
  return {
    ...actual,
  };
});

describe('Audit Details API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/auditdetails/updatecategory', () => {
    describe('GMP Vendor Audits', () => {
      it('returns ISO 9001 in testType for GMP Vendor audits', async () => {
        const request = new Request(
          'http://localhost:3000/api/auditdetails/updatecategory?type=gmp&auditCategory=Vendor',
          {
            method: 'GET',
          }
        );

        const response = await GET(request as any);

        expect(response.status).toBe(200);
        const body = await response.json();
        expect(body.testType).toBeDefined();
        expect(body.testType.iso_9001).toBe('ISO 9001');
      });

      it('returns all GMP Vendor test types including ISO 9001', async () => {
        const request = new Request(
          'http://localhost:3000/api/auditdetails/updatecategory?type=gmp&auditCategory=Vendor',
          {
            method: 'GET',
          }
        );

        const response = await GET(request as any);
        const body = await response.json();

        // Verify all existing types are present
        expect(body.testType.medical_device).toBe('Medical Device');
        expect(body.testType.biologics).toBe('Biologics');
        expect(body.testType.drug_product).toBe('Drug Product');
        expect(body.testType.external_warehouse).toBe('External Warehouse');
        expect(body.testType.medical_device_and_combination_products).toBe(
          'Medical Device and Combination Products'
        );
        // Verify ISO 9001 is added
        expect(body.testType.iso_9001).toBe('ISO 9001');
      });

      it('does not return ISO 9001 for GMP Site audits', async () => {
        const request = new Request(
          'http://localhost:3000/api/auditdetails/updatecategory?type=gmp&auditCategory=Site',
          {
            method: 'GET',
          }
        );

        const response = await GET(request as any);
        const body = await response.json();

        // Site audits should not have Vendor test types
        expect(body.testType).toEqual({});
      });

      it('does not return ISO 9001 for GMP Process audits', async () => {
        const request = new Request(
          'http://localhost:3000/api/auditdetails/updatecategory?type=gmp&auditCategory=Process',
          {
            method: 'GET',
          }
        );

        const response = await GET(request as any);
        const body = await response.json();

        // Process audits should not have Vendor test types
        expect(body.testType).toEqual({});
      });
    });

    describe('Other Audit Types', () => {
      it('does not return ISO 9001 for GDP Vendor audits', async () => {
        const request = new Request(
          'http://localhost:3000/api/auditdetails/updatecategory?type=gdp&auditCategory=Vendor',
          {
            method: 'GET',
          }
        );

        const response = await GET(request as any);
        const body = await response.json();

        // GDP should not have GMP test types
        expect(body.testType).toEqual({});
      });

      it('does not return ISO 9001 for GLP audits', async () => {
        const request = new Request(
          'http://localhost:3000/api/auditdetails/updatecategory?type=glp&auditCategory=Vendor',
          {
            method: 'GET',
          }
        );

        const response = await GET(request as any);
        const body = await response.json();

        expect(body.testType).toEqual({});
      });

      it('does not return ISO 9001 for GCP audits', async () => {
        const request = new Request(
          'http://localhost:3000/api/auditdetails/updatecategory?type=gcp&auditCategory=Vendor',
          {
            method: 'GET',
          }
        );

        const response = await GET(request as any);
        const body = await response.json();

        expect(body.testType).toEqual({});
      });

      it('does not return ISO 9001 for Process audits', async () => {
        const request = new Request(
          'http://localhost:3000/api/auditdetails/updatecategory?type=process&auditCategory=Vendor',
          {
            method: 'GET',
          }
        );

        const response = await GET(request as any);
        const body = await response.json();

        expect(body.testType).toEqual({});
      });
    });

    describe('Validation', () => {
      it('rejects invalid audit type', async () => {
        const request = new Request(
          'http://localhost:3000/api/auditdetails/updatecategory?type=invalid&auditCategory=Vendor',
          {
            method: 'GET',
          }
        );

        const response = await GET(request as any);

        expect(response.status).toBe(400);
      });

      it('rejects invalid audit category', async () => {
        const request = new Request(
          'http://localhost:3000/api/auditdetails/updatecategory?type=gmp&auditCategory=Invalid',
          {
            method: 'GET',
          }
        );

        const response = await GET(request as any);

        expect(response.status).toBe(400);
      });

      it('rejects missing type parameter', async () => {
        const request = new Request(
          'http://localhost:3000/api/auditdetails/updatecategory?auditCategory=Vendor',
          {
            method: 'GET',
          }
        );

        const response = await GET(request as any);

        expect(response.status).toBe(400);
      });

      it('rejects missing auditCategory parameter', async () => {
        const request = new Request(
          'http://localhost:3000/api/auditdetails/updatecategory?type=gmp',
          {
            method: 'GET',
          }
        );

        const response = await GET(request as any);

        expect(response.status).toBe(400);
      });
    });
  });

  describe('PUT /api/auditdetails/updatetestcase', () => {
    it('accepts ISO 9001 in testType field', async () => {
      const request = new Request('http://localhost:3000/api/auditdetails/updatetestcase', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testType: 'ISO 9001',
          auditId: '12345',
        }),
      });

      const response = await updateTestCasePUT(request as any);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.testType).toBe('ISO 9001');
    });

    it('accepts all existing GMP Vendor test types', async () => {
      const testTypes = [
        'Medical Device',
        'Biologics',
        'Drug Product',
        'External Warehouse',
        'Medical Device and Combination Products',
      ];

      for (const testType of testTypes) {
        const request = new Request('http://localhost:3000/api/auditdetails/updatetestcase', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            testType,
            auditId: '12345',
          }),
        });

        const response = await updateTestCasePUT(request as any);

        expect(response.status).toBe(200);
        const body = await response.json();
        expect(body.success).toBe(true);
      }
    });

    it('rejects invalid test type', async () => {
      const request = new Request('http://localhost:3000/api/auditdetails/updatetestcase', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testType: 'Invalid Test Type',
          auditId: '12345',
        }),
      });

      const response = await updateTestCasePUT(request as any);

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.success).toBe(false);
      expect(body.error).toContain('Invalid test type');
    });

    it('accepts request without testType field', async () => {
      const request = new Request('http://localhost:3000/api/auditdetails/updatetestcase', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditId: '12345',
          someOtherField: 'value',
        }),
      });

      const response = await updateTestCasePUT(request as any);

      expect(response.status).toBe(200);
    });
  });

  describe('PUT /api/auditdetails/savegmpauditcategory', () => {
    it('accepts ISO 9001 in auditType field for Vendor category', async () => {
      const request = new Request('http://localhost:3000/api/auditdetails/savegmpauditcategory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditType: 'ISO 9001',
          auditCategory: 'Vendor',
          auditId: '12345',
        }),
      });

      const response = await saveGMPAuditCategoryPUT(request as any);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.auditType).toBe('ISO 9001');
    });

    it('accepts ISO 9001 in testType field for Vendor category', async () => {
      const request = new Request('http://localhost:3000/api/auditdetails/savegmpauditcategory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testType: 'ISO 9001',
          auditCategory: 'Vendor',
          auditId: '12345',
        }),
      });

      const response = await saveGMPAuditCategoryPUT(request as any);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.testType).toBe('ISO 9001');
    });

    it('accepts all existing GMP Vendor test types for Vendor category', async () => {
      const testTypes = [
        'Medical Device',
        'Biologics',
        'Drug Product',
        'External Warehouse',
        'Medical Device and Combination Products',
        'ISO 9001',
      ];

      for (const testType of testTypes) {
        const request = new Request('http://localhost:3000/api/auditdetails/savegmpauditcategory', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            auditType: testType,
            auditCategory: 'Vendor',
            auditId: '12345',
          }),
        });

        const response = await saveGMPAuditCategoryPUT(request as any);

        expect(response.status).toBe(200);
        const body = await response.json();
        expect(body.success).toBe(true);
      }
    });

    it('rejects invalid audit type for Vendor category', async () => {
      const request = new Request('http://localhost:3000/api/auditdetails/savegmpauditcategory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditType: 'Invalid Type',
          auditCategory: 'Vendor',
          auditId: '12345',
        }),
      });

      const response = await saveGMPAuditCategoryPUT(request as any);

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.success).toBe(false);
      expect(body.error).toContain('Invalid audit/test type');
    });

    it('accepts request without auditType for non-Vendor categories', async () => {
      const request = new Request('http://localhost:3000/api/auditdetails/savegmpauditcategory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditCategory: 'Site',
          auditId: '12345',
        }),
      });

      const response = await saveGMPAuditCategoryPUT(request as any);

      expect(response.status).toBe(200);
    });

    it('accepts valid audit category values', async () => {
      const categories = ['Vendor', 'Site', 'Process'];

      for (const category of categories) {
        const request = new Request('http://localhost:3000/api/auditdetails/savegmpauditcategory', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            auditCategory: category,
            auditId: '12345',
          }),
        });

        const response = await saveGMPAuditCategoryPUT(request as any);

        expect(response.status).toBe(200);
      }
    });
  });
});
